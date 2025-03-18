
import { toast } from "sonner";

// Arabic word detection regex
const ARABIC_REGEX = /^[\u0600-\u06FF]+$/;

// Gemini API endpoint
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = "AIzaSyA6_Vy0_pIW_cxlHt1O4BS1hVddfSO0poA"; // Consider moving this to environment variables

export interface WordData {
  word: string;
  cefrLevel: string;
  field: string;
  partOfSpeech: string;
  lemma: string;
  definition: string;
  synonyms: string;
  antonyms: string;
  example: string;
  phonetic?: string; // Optional since it may not be available
}

export const isArabicWord = (word: string): boolean => {
  return ARABIC_REGEX.test(word);
};

export const fetchWordData = async (word: string): Promise<WordData | null> => {
  if (!isArabicWord(word)) {
    toast.error("يُسمح فقط بالكلمات العربية. حاول مرة أخرى!");
    return null;
  }

  try {
    const prompt = `
    أعطني تحليلًا دقيقًا ومنسقًا للكلمة "${word}" بصيغة واضحة، حيث كل معلومة تكون في سطر مستقل وفقًا للتنسيق التالي:

    كلمة: ${word}
    مستوى CEFR: (A1, A2, B1, B2, C1, C2 فقط - لا تتركه فارغًا)
    المجال: (حدد مجالًا واحدًا فقط مثل: قانون، طب، هندسة...)
    نوع الكلمة: (اسم، فعل، صفة، حال...)
    الجذر: (اكتب الجذر فقط، بدون شرح)
    التعريف: (جملة واحدة فقط تشرح المعنى بوضوح)
    المرادفات: (قائمة مفصولة بفواصل، بدون شرح إضافي)
    الأضداد: (قائمة مفصولة بفواصل، أو اكتب "غير متوفر" إذا لم يكن هناك)
    مثال استخدام: (جملة قصيرة توضح استخدام الكلمة)

    **مهم جدًا**: تأكد من إعطائي مستوى CEFR من بين: A1, A2, B1, B2, C1, C2. لا تتركه غير متوفر.
    `;

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024
      }
    };

    toast.loading("جاري البحث...");
    
    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Parse the response
    const wordData: WordData = {
      word: word,
      cefrLevel: extractField(generatedText, "مستوى CEFR"),
      field: extractField(generatedText, "المجال"),
      partOfSpeech: extractField(generatedText, "نوع الكلمة"),
      lemma: extractField(generatedText, "الجذر"),
      definition: extractField(generatedText, "التعريف"),
      synonyms: extractField(generatedText, "المرادفات"),
      antonyms: extractField(generatedText, "الأضداد"),
      example: extractField(generatedText, "مثال استخدام"),
      phonetic: `/...$/` // Placeholder since we don't have real phonetics
    };
    
    toast.dismiss();
    return wordData;
  } catch (error) {
    console.error("Error fetching word data:", error);
    toast.error("حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى.");
    return null;
  }
};

// Helper function to extract fields from the generated text
const extractField = (text: string, fieldName: string): string => {
  const lines = text.split('\n');
  for (const line of lines) {
    if (line.includes(`${fieldName}:`)) {
      const parts = line.split(`${fieldName}:`);
      if (parts.length > 1) {
        return parts[1].trim();
      }
    }
  }
  return "غير متوفر";
};
