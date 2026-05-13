/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PetRequirement {
  pet: string;
  time: number;
  interaction: number;
  energy: number;
  space: number;
  mess: number;
  noise: number;
  setup_complexity: number;
  budget: number;
}

export const PET_DATASET: PetRequirement[] = [
  { pet: "DogSmall", time: 3, interaction: 3, energy: 2, space: 2, mess: 2, noise: 2, setup_complexity: 2, budget: 3 },
  { pet: "DogActive", time: 5, interaction: 5, energy: 5, space: 4, mess: 5, noise: 4, setup_complexity: 2, budget: 4 },
  { pet: "CatIndie", time: 2, interaction: 2, energy: 2, space: 2, mess: 2, noise: 1, setup_complexity: 1, budget: 3 },
  { pet: "CatCuddly", time: 4, interaction: 5, energy: 4, space: 2, mess: 3, noise: 2, setup_complexity: 1, budget: 3 },
  { pet: "Bird", time: 4, interaction: 5, energy: 3, space: 3, mess: 4, noise: 5, setup_complexity: 3, budget: 3 },
  { pet: "Rabbit", time: 5, interaction: 3, energy: 3, space: 3, mess: 4, noise: 1, setup_complexity: 4, budget: 4 },
  { pet: "Lizard", time: 2, interaction: 1, energy: 1, space: 2, mess: 2, noise: 1, setup_complexity: 5, budget: 4 },
  { pet: "Fish", time: 3, interaction: 1, energy: 1, space: 3, mess: 3, noise: 1, setup_complexity: 5, budget: 4 }
];

export const WEIGHTS: Record<keyof Omit<PetRequirement, "pet">, number> = {
  time: 2,
  interaction: 2,
  energy: 2,
  space: 1,
  mess: 1,
  noise: 1,
  setup_complexity: 2,
  budget: 1
};

export interface Question {
  id: number;
  text: string;
  dimension: keyof Omit<PetRequirement, "pet">;
  options: { text: string; value: number }[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "วันธรรมดา คุณมีเวลาให้สัตว์เลี้ยงประมาณกี่ชั่วโมง?",
    dimension: "time",
    options: [
      { text: "เกือบไม่มี ทำงานหัวฟู", value: 1 },
      { text: "ครึ่งชั่วโมงพอไหว", value: 2 },
      { text: "1–2 ชั่วโมง", value: 3 },
      { text: "หลายชั่วโมง อยู่บ้านบ่อย", value: 4 },
      { text: "ทั้งวัน WFH ตัวจริง", value: 5 }
    ]
  },
  {
    id: 2,
    text: "อยากใกล้ชิด/กอด/เล่นด้วยมากแค่ไหน?",
    dimension: "interaction",
    options: [
      { text: "มองห่าง ๆ ก็พอ", value: 1 },
      { text: "ทักทายเบา ๆ", value: 2 },
      { text: "เล่นบ้างเป็นช่วง ๆ", value: 3 },
      { text: "อยากกอดอยากเล่นบ่อย", value: 4 },
      { text: "ติดกันตลอด 24/7", value: 5 }
    ]
  },
  {
    id: 3,
    text: "ไลฟ์สไตล์ของคุณ active แค่ไหน?",
    dimension: "energy",
    options: [
      { text: "เป็นก้อนหินบนโซฟา", value: 1 },
      { text: "ออกบ้านบ้าง", value: 2 },
      { text: "ปานกลาง เดินเล่นได้", value: 3 },
      { text: "ออกกำลังกายสม่ำเสมอ", value: 4 },
      { text: "นักวิ่ง/สายแอดเวนเจอร์", value: 5 }
    ]
  },
  {
    id: 4,
    text: "พื้นที่ที่บ้านคุณเป็นยังไง?",
    dimension: "space",
    options: [
      { text: "ห้องเดี่ยวจิ๋ว", value: 1 },
      { text: "คอนโด 1 ห้องนอน", value: 2 },
      { text: "คอนโดใหญ่/ทาวน์เฮาส์", value: 3 },
      { text: "บ้านมีพื้นที่", value: 4 },
      { text: "บ้านพร้อมสนามหญ้า", value: 5 }
    ]
  },
  {
    id: 5,
    text: "รับขนร่วง/เลอะเทอะได้แค่ไหน?",
    dimension: "mess",
    options: [
      { text: "เห็นเศษนิดเดียวก็จี๊ด", value: 1 },
      { text: "พอรับได้แต่ต้องสะอาด", value: 2 },
      { text: "เฉย ๆ กวาดได้", value: 3 },
      { text: "ไม่ซีเรียส", value: 4 },
      { text: "เลอะแค่ไหนก็รัก", value: 5 }
    ]
  },
  {
    id: 6,
    text: "รับเสียงดังในบ้านได้ขนาดไหน?",
    dimension: "noise",
    options: [
      { text: "ขอเงียบสุด ๆ", value: 1 },
      { text: "เงียบเป็นส่วนใหญ่", value: 2 },
      { text: "ปานกลาง", value: 3 },
      { text: "เสียงเยอะได้", value: 4 },
      { text: "ยิ่งเสียงแซ่บยิ่งชอบ", value: 5 }
    ]
  },
  {
    id: 7,
    text: "ถนัดเซ็ตอัพอุปกรณ์ซับซ้อน (ตู้ ไฟ ฟิลเตอร์ อุณหภูมิ) ไหม?",
    dimension: "setup_complexity",
    options: [
      { text: "เห็นสายไฟแล้วท้อ", value: 1 },
      { text: "พอประกอบ IKEA ได้", value: 2 },
      { text: "ทำตามคู่มือไหว", value: 3 },
      { text: "สาย DIY ตัวยง", value: 4 },
      { text: "วิศวกรในคราบมนุษย์", value: 5 }
    ]
  },
  {
    id: 8,
    text: "งบต่อเดือนสำหรับสัตว์เลี้ยงประมาณ?",
    dimension: "budget",
    options: [
      { text: "ต่ำกว่า 500 บาท", value: 1 },
      { text: "500–1,500 บาท", value: 2 },
      { text: "1,500–3,000 บาท", value: 3 },
      { text: "3,000–6,000 บาท", value: 4 },
      { text: "เกิน 6,000 บาท", value: 5 }
    ]
  },
  {
    id: 9,
    text: "เดินทาง/ไปต่างจังหวัดบ่อยแค่ไหน?",
    dimension: "time",
    options: [
      { text: "แทบทุกสุดสัปดาห์", value: 1 },
      { text: "เดือนละหลายครั้ง", value: 2 },
      { text: "นาน ๆ ที", value: 3 },
      { text: "ปีละไม่กี่ครั้ง", value: 4 },
      { text: "ติดบ้านมาก", value: 5 }
    ]
  },
  {
    id: 10,
    text: "อยากให้สัตว์ตอบสนองชื่อ/คำสั่งคุณไหม?",
    dimension: "interaction",
    options: [
      { text: "ไม่ต้อง อยู่ของมันก็ได้", value: 1 },
      { text: "นิดหน่อย", value: 2 },
      { text: "พอประมาณ", value: 3 },
      { text: "เชื่อฟังบ้างก็ดี", value: 4 },
      { text: "อยากได้คู่หูสุดสนิท", value: 5 }
    ]
  },
  {
    id: 11,
    text: "อยากออกไปเล่นนอกบ้านกับมันแค่ไหน?",
    dimension: "energy",
    options: [
      { text: "ไม่ต้องออก ดีที่สุด", value: 1 },
      { text: "นาน ๆ ที", value: 2 },
      { text: "เสาร์อาทิตย์", value: 3 },
      { text: "เกือบทุกวัน", value: 4 },
      { text: "ทุกวันเช้าเย็น", value: 5 }
    ]
  },
  {
    id: 12,
    text: "พร้อมจ่ายค่าหมอ/ฉุกเฉินแค่ไหน?",
    dimension: "budget",
    options: [
      { text: "หวั่น ๆ", value: 1 },
      { text: "พอมีสำรองนิดหน่อย", value: 2 },
      { text: "มีเงินเก็บก้อนกลาง", value: 3 },
      { text: "พร้อมจ่ายเต็มที่", value: 4 },
      { text: "มีประกันสัตว์เลี้ยงด้วย", value: 5 }
    ]
  }
];

export const PET_DETAILS: Record<string, {
  name: string;
  emoji: string;
  image: string;
  label: string;
  iconBg: string;
  why: string;
  warning: string;
  tips: string[];
  theme: { bg: string; accent: string; environment: string };
  adoptionStat: string;
  quote: string;
  breeds: string;
}> = {
  DogSmall: {
    name: "หมาไซซ์เล็กสายชิล",
    emoji: "🐶",
    image: "/dog_small.jfif",
    label: "หมาจิ๋วสายชิล",
    iconBg: "bg-[#FFECC7]",
    why: "คุณเป็นคนรักความสงบแต่ก็เหงาเป็นบางเวลา เจ้าหมาจิ๋วสูงวัยที่นิสัยนิ่งๆ จะเป็นเพื่อนร่วมดูซีรีส์ที่ยอดเยี่ยมที่สุด",
    warning: "ระวังเรื่องสุขภาพช่องปากและกระดูกตามวัย ถึงจะชิลแต่ก็ต้องการการกอดเป็นประจำนะ",
    tips: ["แปรงฟันสัปดาห์ละ 2-3 ครั้ง", "ไม่ต้องพาวิ่งไกล แค่เดินเล่นหน้าบ้านก็พอ", "หาชุดสวยๆ ให้ใส่น้องจะแฮปปี้"],
    theme: { bg: "bg-[#FFDAC1]", accent: "#FF9AA2", environment: "มุมโซฟานุ่มๆ ในห้องรับแขก" },
    adoptionStat: "หมาโตไซซ์เล็กมักจะถูกรับเลี้ยงช้ากว่าลูกหมา แต่ต้องการความรักไม่แพ้กัน",
    quote: " วิ่งไม่ไหวแต่นั่งตักเป็นเพื่อนได้ทั้งวันนะ ",
    breeds: "ปอมเมอเรเนียน, ชิวาวา, มอลทีส"
  },
  DogActive: {
    name: "หมาเอนเนอร์จี้สูง",
    emoji: "🐕",
    image: "/dog_active.jfif",
    label: "หมาพลังเยอะ",
    iconBg: "bg-[#FFECC7]",
    why: "คุณมีพลังงานเหลือล้นและชอบกิจกรรมกลางแจ้ง! คุณต้องการคู่หูที่จะไปวิ่งออกกำลังกายกับคุณได้ทุกเมื่อ",
    warning: "ถ้าคุณไม่พาวิ่ง บ้านคุณอาจจะพังได้ เตรียมตัวให้พร้อมกับโหมดทำลายล้างถ้าไม่ได้ปลดปล่อยพลัง",
    tips: ["พาวิ่งอย่างน้อย 1 ชั่วโมงต่อวัน", "หาของเล่นฝึกสมองให้น้องเล่น", "พาไปพบปะเพื่อนหมาตัวอื่นบ้าง"],
    theme: { bg: "bg-[#FFDAC1]", accent: "#FF9AA2", environment: "สวนสาธารณะที่กว้างขวาง" },
    adoptionStat: "หมาวัยเด็กสายพลังต้องการพื้นที่และเวลาที่มั่นคงจากเจ้าของ",
    quote: " วิ่งอีก! วิ่งอีก! คาบลูกบอลมาให้แล้วเนี่ย! ",
    breeds: "โกลเด้น รีทรีฟเวอร์, ลาบราดอร์, บอร์เดอร์ คอลลี่"
  },
  CatIndie: {
    name: "แมวอินดี้",
    emoji: "🐈",
    image: "/cat_indie.jfif",
    label: "แมวโลกส่วนตัวสูง",
    iconBg: "bg-[#FFD9DF]",
    why: "คุณชอบความเงียบและเข้าใจเรื่องพื้นที่ส่วนตัว คุณต้องการเพื่อนที่แค่ 'อยู่ด้วยกัน' โดยที่ไม่ต้องมานัวเนียกันตลอดเวลา",
    warning: "อย่าไปบังคับน้องให้อุ้มเด็ดขาด น้องมีโหมดดุเป็นพักๆ ถ้าอารมณ์ไม่ดี",
    tips: ["จัดมุมส่วนตัวที่สงบให้น้อง", "อย่าเปลี่ยนที่วางชามข้าวบ่อยๆ", "ใช้ไม้ล่อแมวเล่นแก้เบื่อแทนการจับตัว"],
    theme: { bg: "bg-[#C7CEEA]", accent: "#CDB7F6", environment: "ห้องสมุดส่วนตัวที่เงียบสงบ" },
    adoptionStat: "แมวโตที่มีบุคลิกชัดเจนมักจะหาคู่แท้ที่เข้าใจสไตล์เดียวกันได้ยาก",
    quote: " ฉันรักเธอจากระยะไกล... ตรงนี้แหละคือที่ของฉัน ",
    breeds: "เปอร์เซีย, บริติช ชอร์ตแฮร์, สก็อตติช โฟลด์"
  },
  CatCuddly: {
    name: "แมวเด็กติดคน",
    emoji: "🐱",
    image: "/cat_cuddly.jfif",
    label: "แมวขี้อ้อน",
    iconBg: "bg-[#FFD9DF]",
    why: "คุณต้องการความอบอุ่นและเสียง 'ครืดๆ' ข้างหูตลอดเวลา เจ้าแมวน้อยที่ติดสอยห้อยตามคุณไปทุกที่คือคำตอบ",
    warning: "ระวังเรื่องพฤติกรรมก้าวร้าวเมื่อลูกแมวโตขึ้นถ้าไม่ฝึกตั้งแต่เด็ก และต้องมีเวลาเล่นด้วยเยอะๆ",
    tips: ["มีเวลาเล่นด้วยสม่ำเสมอ", "แปรงขนบ่อยๆ น้องจะชอบมาก", "เตรียมนมแมวไว้รอปรนเปรอ"],
    theme: { bg: "bg-[#C7CEEA]", accent: "#CDB7F6", environment: "เตียงนอนนุ่มๆ ที่มีแสงแดดส่อง" },
    adoptionStat: "ลูกแมวมักจะมีสถิติการถูกจองตัวเร็วตั้งแต่ในศูนย์พักพิง",
    quote: " อุ้มหน่อย! ตามไปทุกห้องแล้วเนี่ย เห็นใจกันบ้าง ",
    breeds: "แมวไทยวิเชียรมาศ, แร็กดอลล์, สฟิงซ์"
  },
  Bird: {
    name: "นกเสียงดังชอบคุย",
    emoji: "🦜",
    image: "/bird.jfif",
    label: "นกขี้โม้",
    iconBg: "bg-[#D1F0F0]",
    why: "คุณรักอิสระและชอบความครึกครื้น นกที่ชอบส่งเสียงคุยจะทำให้บ้านคุณไม่เงียบเหงาอีกต่อไป",
    warning: "เพื่อนบ้านอาจจะไม่ปลื้มเสียงร้อง และต้องระวังเรื่องความสะอาดอย่างมาก",
    tips: ["ปล่อยให้ออกมาบินในที่ปลอดภัยทุกวัน", "คุยกับน้องบ่อยๆ ป้องกันความเครียด", "จัดหาของเล่นทำจากไม้ให้แทะเล่น"],
    theme: { bg: "bg-[#B5EAD7]", accent: "#CCD5AE", environment: "คอนยืนริมหน้าต่างที่วิวดีที่สุด" },
    adoptionStat: "นกในวัยเด็กต้องการความใส่ใจในการฝึกมากเป็นพิเศษ",
    quote: " สวัสดี! กินข้าวยัง? ร้องเพลงให้ฟังไหมล่ะจ๊ะ ",
    breeds: "นกค็อกคาเทล, เลิฟเบิร์ด, นกแก้วซันคอนัวร์"
  },
  Rabbit: {
    name: "กระต่ายต้องดูแลละเอียด",
    emoji: "🐰",
    image: "/rabbit.jfif",
    label: "กระต่ายแสนบอบบาง",
    iconBg: "bg-[#E2F0CB]",
    why: "คุณเป็นคนรักความละเมียดละไมและใส่ใจรายละเอียด คุณภูมิใจในการดูแลสิ่งที่ต้องการความทะนุถนอมเป็นพิเศษ",
    warning: "กระต่ายสุขภาพบอบบางต้องการความรู้เฉพาะทาง การดูแลเรื่องอาหารและอุณภูมิต้องเป๊ะมาก",
    tips: ["หญ้าขน (Timothy) ต้องมีให้กินไม่ขาด", "ตรวจหาคลินิกสัตว์ Exotic ที่ไว้ใจได้", "ห้ามอุ้มแรงๆ เพราะกระดูกขาสันหลังเปราะ"],
    theme: { bg: "bg-[#FFDAC1]", accent: "#FFD36E", environment: "พื้นที่ในบ้านที่มีการกั้นอาณาเขตอย่างดี" },
    adoptionStat: "กระต่ายที่ต้องการการดูแลสุขภาพพิเศษมักจะหาบ้านยากที่สุด",
    quote: " ตัวนุ่มนิ่มแต่เรื่องเยอะนะ... พร้อมจะเปย์หรือยัง? ",
    breeds: "ฮอลแลนด์ ลอป, เนเธอร์แลนด์ ดวอร์ฟ"
  },
  Lizard: {
    name: "สัตว์เลื้อยคลาน (มังกรจำลอง)",
    emoji: "🦎",
    image: "/lizard.jfif",
    label: "กิ้งก่า",
    iconBg: "bg-[#FFECC7]",
    why: "คุณมันคนคูลๆ ชอบอะไรที่แปลกใหม่และไม่ต้องคุยด้วยเยอะ คุณต้องการสัตว์เลี้ยงที่มองหน้ากันเฉยๆ ก็เข้าใจ",
    warning: "เตรียมเงินไว้กับค่าไฟ (หลอด UV) และจิตใจที่ต้องอยู่กับแมลงสาบหรือหนอนเพื่อเป็นอาหาร",
    tips: ["คุมอุณหภูมิให้เป๊ะ ไม่งั้นน้องจะจำศีลยาว", "จัดตู้ให้เหมือนป่าอเมซอน น้องจะแฮปปี้", "ล้างมือทุกครั้งหลังจับ น้องอาจมีแบคทีเรีย"],
    theme: { bg: "bg-[#E2F0CB]", accent: "#CCD5AE", environment: "ตู้กระจกดีไซน์สวนขวดป่าฝน" },
    adoptionStat: "Exotic Pets ใช้เวลาการเตรียมตัว (Setup) นานที่สุด",
    quote: " เท่ เงียบ ดูแลง่าย...ถ้าคุณเซ็ตตู้เป็น ",
    breeds: "กิ้งก่าเบียร์ดดราก้อน, จิ้งจกทะเลทราย"
  },
  Fish: {
    name: "ปลาสวยงาม (ทีวีที่มีชีวิต)",
    emoji: "🐠",
    image: "/fish.jfif",
    label: "ปลา",
    iconBg: "bg-[#D1F0F0]",
    why: "คุณคือวิศวกรตัวน้อยที่รักงานจัดสวนในน้ำ และชอบดูอะไรที่เคลื่อนไหวช้าๆ เพื่อดับความว้าวุ่นในใจ",
    warning: "คุณจะกลายเป็นทาสระบบกรองน้ำ และเงินจะหายไปกับต้นไม้น้ำที่เลี้ยวยากกว่าลูก",
    tips: ["อย่าให้อาหารเยอะเกินไป น้ำจะเน่าเอาได้", "ใช้ชุดทดสอบค่าน้ำเป็นประจำ", "ศึกษาเรื่องปลาที่จะเลี้ยงร่วมกัน เดี๋ยวจะกลายเป็น Hunger Games ใต้น้ำ"],
    theme: { bg: "bg-[#F0F7FF]", accent: "#A2D2FF", environment: "ตู้ปลาน้ำจืดระบบนิเวศน์สมบูรณ์" },
    adoptionStat: "ปลาเป็นสัตว์ที่ต้องการงบประมาณคงที่มากที่สุด",
    quote: " สวยงามสงบนิ่ง...แต่ต้องชิงชัยกับตะไคร่น้ำ ",
    breeds: "ปลากัด, ปลาทอง, ปลาหางนกยูง"
  }

};
