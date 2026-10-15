export const siteInfo = {
  name: "Siddhartha Boarding Secondary School",
  shortName: "Siddhartha Boarding Secondary School",
  location: "Nawalpur, Nepal",
  address: "Shivamandir-2, Kawasoti-3, Nawalpur (Nawalparasi), Nepal",
  phones: ["078-540168", "078-540368", "078-540634"],
  established: "2046 B.S. (1989 AD)",
  motto: "Live to learn, learn to serve the country and the poor.",
  facebook: "https://www.facebook.com/kawasotisiddhartha",
  mapQuery: "27.6421528547774,84.12206610892291",
  founder: {
    name: "Bhoj Raj Dahal",
    role: "Founder & Principal",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/campus-life", label: "Campus Life" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

// Condensed ladder used on the Home page only (index strip)
// School currently teaches Montessori/Nursery through Grade 10 (SEE) only.
export const academicLadderShort = [
  { step: "I", title: "Montessori / Nursery" },
  { step: "II", title: "Primary" },
  { step: "III", title: "Lower Secondary" },
  { step: "IV", title: "Secondary (SEE)" },
];

// Full ladder with subject detail, used on the Academics page only
export const academicLadderDetailed = [
  {
    step: "I",
    title: "Montessori / Nursery",
    grades: "Playgroup – UKG",
    desc: "A gentle, play-first introduction to the classroom. Children build early motor, language and social skills in our dedicated Montessori wing before moving into formal schooling.",
    focus: ["Spoken language & phonics", "Number sense through play", "Motor skills & creative arts", "Social habits & routine-building"],
  },
  {
    step: "II",
    title: "Primary",
    grades: "Grades 1 – 5",
    desc: "Foundational literacy and numeracy take hold, alongside a widening set of subjects. Class sizes and teaching pace are kept appropriate for younger learners in our dedicated primary block.",
    focus: ["English & Nepali language", "Mathematics fundamentals", "Science & Environment", "Social Studies, Health & Physical Education"],
  },
  {
    step: "III",
    title: "Lower Secondary",
    grades: "Grades 6 – 8",
    desc: "Subjects broaden and study habits mature. Students are introduced to more structured assessment and begin building the academic discipline needed for SEE preparation.",
    focus: ["Compulsory & Optional Mathematics", "Science", "Social Studies", "English, Nepali & a third language option"],
  },
  {
    step: "IV",
    title: "Secondary (SEE)",
    grades: "Grades 9 – 10",
    desc: "Focused preparation for the Secondary Education Examination (SEE), Nepal's national Grade 10 board exam — the final stage of the school's academic ladder.",
    focus: ["Core SEE subjects (Math, Science, English, Nepali, Social Studies)", "Optional subjects", "Regular model/mock examinations", "Post-SEE guidance & counseling"],
  },
];

// Academic / learning-resource facilities — used on the Academics page only
export const academicFacilities = [
  { title: "Science Lab", desc: "A dedicated laboratory for practical secondary-level science classes, from basic chemistry to physics demonstrations." },
  { title: "Computer Lab", desc: "Hands-on computer literacy and IT coursework on dedicated school workstations." },
  { title: "Library", desc: "A well-stocked reading room with reference material across every level, from early readers to SEE revision." },
  { title: "Audio-Visual Room", desc: "Multimedia-equipped space supporting our discussion-based, interactive teaching style." },
];

// Campus / recreational facilities — used on the Campus Life page only
// Note: the school does not currently operate a hostel/boarding facility.
export const campusFacilities = [
  { title: "Transportation", desc: "Dedicated bus routes connecting Kawasoti and nearby villages to campus every school day." },
  { title: "Playground & Sports", desc: "A spacious ground with full sports equipment for physical education, athletics and team games." },
  { title: "Montessori Wing", desc: "A dedicated, child-safe space for our youngest learners to explore, play and begin formal learning." },
  { title: "Canteen", desc: "An on-campus canteen serving students and staff through the school day." },
  { title: "Cycle Stand", desc: "Secure, supervised cycle parking for students commuting from nearby wards." },
];

export const stats = [
  { num: "35+", label: "Years of Legacy" },
  { num: "1,600+", label: "Students" },
  { num: "20", label: "Ropanis of Campus" },
  { num: "1st", label: "Municipality SEE Rank" },
];

// Student quotes/portraits from "The Student's Voice" / Bidyarthiharuko Aawaz
// co-production with Radio Kawasoti & Kawasoti TV — used on Campus Life + Home
export const studentVoices = [
  {
    image: "/images/student_voice_boy1.jpg",
    quote: "Being on The Student's Voice taught me that our opinions on real issues actually matter outside the classroom too.",
    context: "Grade 10 student, on-air guest",
  },
  {
    image: "/images/student_voice_girl_radio1.jpg",
    quote: "Recording in the studio with Radio Kawasoti pushed me to research properly before I ever open my mouth on air.",
    context: "Secondary-level student, on-air guest",
  },
  {
    image: "/images/student_voice_girl_outdoor.jpg",
    quote: "We talk about things like civic sense and unemployment — topics that affect our own future, not just textbook answers.",
    context: "Secondary-level student, on-air guest",
  },
  {
    image: "/images/student_voice_girl_radio2.jpg",
    quote: "It's one thing to learn about society in class, and another to discuss it live on the radio with real listeners.",
    context: "Secondary-level student, on-air guest",
  },
];

export const admissionSteps = [
  { n: "01", t: "Enquire", d: "Call the school office or submit the enquiry form below with your child's grade and details." },
  { n: "02", t: "Visit & Document Check", d: "Visit the campus with your child's previous academic records and required documents." },
  { n: "03", t: "Assessment", d: "A short interaction/assessment may be scheduled depending on grade level." },
  { n: "04", t: "Confirmation & Enrollment", d: "Once confirmed, complete enrollment formalities and fee submission to secure the seat." },
];

export const admissionFaqs = [
  {
    q: "What grades can my child join?",
    a: "We admit students from Montessori/Nursery through Grade 10 (SEE), subject to seat availability at each level.",
  },
  {
    q: "Does the school offer scholarships?",
    a: "Yes — scholarship schemes exist for deserving students, in keeping with the school's own motto of service to those with less. Eligibility is confirmed directly with the office.",
  },
  {
    q: "Is transportation available from my area?",
    a: "The school runs dedicated bus routes across Kawasoti and nearby villages. Contact the office to confirm whether your area is currently covered.",
  },
  {
    q: "What documents are required for admission?",
    a: "Generally: the student's previous school records/transfer certificate, a copy of the student's and guardian's citizenship/birth certificate, and passport-size photos. Please confirm the exact list with the office, as requirements can vary by grade.",
  },
];

export const galleryCategories = [
  {
    title: "Campus",
    images: [
      { src: "/images/campus-hero.jpg", alt: "Campus front elevation" },
      { src: "/images/campus-1.jpg", alt: "Campus building with event banner" },
      { src: "/images/campus-2.jpg", alt: "Campus building with event banner" },
    ],
  },
  {
    title: "Students",
    images: [
      { src: "/images/students-1.jpg", alt: "Students at a school event" },
      { src: "/images/students-2.jpg", alt: "Students at a school event" },
      { src: "/images/student_voice_boy1.jpg", alt: "Student on The Student's Voice program" },
    ],
  },
  {
    title: "Faculty & Staff",
    images: [
      { src: "/images/staff-1.jpg", alt: "Faculty and staff group" },
      { src: "/images/staff-2.jpg", alt: "Faculty and staff group" },
      { src: "/images/student_voice_girl_radio2.jpg", alt: "Student on The Student's Voice program" },
    ],
  },
  {
    title: "Community & Media",
    images: [
      { src: "/images/student-voice.jpg", alt: "The Student's Voice radio program" },
      { src: "/images/student_voice_girl_radio1.jpg", alt: "Student recording at Radio Kawasoti" },
      { src: "/images/community_insurance_event.jpg", alt: "Community accident-insurance program event" },
    ],
  },
  {
    title: "Achievements",
    images: [
      { src: "/images/see-toppers.jpg", alt: "SEE result toppers banner" },
      { src: "/images/seal-stamp.jpg", alt: "Official school seal" },
      { src: "/images/student_voice_girl_outdoor.jpg", alt: "Student on The Student's Voice program" },
    ],
  },
];
