// app/mockData.ts

export interface Hadith {
    id: string;
    narrator: string;
    text: {
      arabic: string;
      english: string;
    };
    source: string;
    chapter: string;
    grading: string;
    relatedHadiths: string[];
  }
  
  export const sampleHadith: Hadith[] = [
    {
      id: "bukhari:1",
      narrator: "Umar bin Al-Khattab",
      text: {
        arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
        english: "The rewards of deeds depend upon the intentions, and every person will get the reward according to what he has intended."
      },
      source: "Sahih al-Bukhari",
      chapter: "Book of Revelation",
      grading: "Sahih",
      relatedHadiths: ["muslim:1907", "tirmidhi:1647"]
    },
    {
      id: "muslim:2553",
      narrator: "Abu Hurairah",
      text: {
        arabic: "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا، نَفَّسَ اللهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ",
        english: "Whoever relieves a believer's distress of the distressful aspects of this world, Allah will rescue him from a difficulty of the difficulties of the Hereafter."
      },
      source: "Sahih Muslim",
      chapter: "Book of Virtue, Enjoining Good Manners, and Joining of the Ties of Kinship",
      grading: "Sahih",
      relatedHadiths: ["bukhari:6024", "tirmidhi:1930"]
    },
    {
      id: "tirmidhi:1924",
      narrator: "Abdullah ibn Amr",
      text: {
        arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
        english: "The merciful are shown mercy by the Most Merciful. Be merciful to those on earth, and He who is in heaven will be merciful to you."
      },
      source: "Jami` at-Tirmidhi",
      chapter: "Book on Righteousness and Maintaining Good Relations with Relatives",
      grading: "Hasan",
      relatedHadiths: ["abu-dawud:4941", "ahmad:6494"]
    }
  ];
  
  export const sources = ["Sahih al-Bukhari", "Sahih Muslim", "Jami` at-Tirmidhi"];
  export const narrators = ["Umar bin Al-Khattab", "Abu Hurairah", "Abdullah ibn Amr"];
  export const gradings = ["Sahih", "Hasan", "Da'if"];