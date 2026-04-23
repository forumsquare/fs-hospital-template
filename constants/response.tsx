import {
  AddressType,
  // BookingDetailType,
  DoctorType,
  FacilityType,
  NotificationType,
  ReviewType,
  SocialMediaType,
  SpecialisationType,
  StoreInfoType,
  TestimonialType,
  TreatmentType,
} from "@/models/schema";
import { DropDownItemType } from "@/models/types";

export const addressVal: AddressType = {
  id: "-NSHHSDBSHHSD",
  address: "23-78/129, 12, E Anandbagh Main Rd",
  area: "RK Nagar Colony, East anandhbagh",
  city: "Hyderabad",
  country: "india",
  state: "Telangana",
  zipcode: "500047",
  contactMail: "sangeethkumar84@gmail.com",
  contactNo: "7032111694",
};

export const socialVal: SocialMediaType = {
  facebook: "https://www.facebook.com",
  instagram: "https://www.instagram.com",
  x: "https://x.com",
  youtube: "https://www.youtube.com",
  linkedin: "https://www.linkedin.com",
  whatsapp: "https://wa.me/91XXXXXXXXXX",
};

export const storeInfoVal: StoreInfoType = {
  id: "ff7b53d0-2891-4791-b8d0-fe6320a05a1a",
  logo: "/icons/logo.png",
  name: "EPISKIN",
  tagline: "Beyond Skin & Hair Care",
  about: "At our clinic we provide the best treatments for hair and skin problems. We strive to serve our patients with result oriented treatments. We assure you the best results in shortest possible time.",
  addressList: [addressVal],
  media: [
    { url: "/background/certificate.svg", type: "CERTIFICATE" },
    { url: "https://www.episkin.in/images/team/index-img-01.webp", type: "IMAGE" },
    { url: "https://www.episkin.in/images/team/index-img-02.webp", type: "IMAGE" },
  ],
};

export const docServiceList: DropDownItemType[] = [
  { label: "Acne (Pimple) Treatment", value: "Acne (Pimple) Treatment" },
  { label: "Scars and Marks Removal", value: "Scars and Marks Removal" },
  { label: "Unwanted Hair Removal", value: "Unwanted Hair Removal" },
  { label: "Skin Rejuvenation", value: "Skin Rejuvenation" },
  { label: "Hair Weaving Service", value: "Hair Weaving Service" },
  { label: "Other Skin related service", value: "Other Skin related service" },
];

// export const testimonialList: TestimonialType[] = [
//   {
//     id: "1",
//     userName: "Satish Kumar",
//     rating: 5,
//     testimonial:
//       "Really great experience, my wife had skin and hair treatment from this clinic. Dr. Sangeeth, is well experienced and listen your problem, gives proper time to each patient. Her hair loss has reduced drastically and skin dark spots reduced within 20 days",
//   },
//   {
//     id: "2",
//     userName: "Pranav",
//     rating: 5,
//     testimonial:
//       "I've been having my skin condition for a few years now and a couple doctor visits later it still didn't get any better. But then I was suggested to visit Dr.Sangeeth and things started to change . He carefully explained everything",
//   },
//   {
//     id: "3",
//     userName: "Krishna Kumar",
//     rating: 5,
//     testimonial:
//       "I had a wonderful experience with Dr Sangeeth Kumar for Skin and allergy problem What really impressed me was the level of patience they showed throughout the entire consultation.",
//   },
//   {
//     id: "4",
//     userName: "Shavina Parvin",
//     rating: 5,
//     testimonial:
//       "I have visited Dr Sangeetha for my any skin and hair treatments and got good results every time. I highly recommend him. He is kind and compassionate towards his patients and work. ",
//   },
//   {
//     id: "5",
//     userName: "Sampath Goura",
//     rating: 5,
//     testimonial:
//       "My daughter Rohini she suffer Urticaria we consult Dr.Sangeeth Kumar Dermotologist episkin clinic, boduppal he treated op basis giving oral medication she recovered well. excellent treatment doctor is excellent he spoke friendly and very polite I suggested this doctor. ",
//   },
// ];

export const specializationList: SpecialisationType[] = [
  {
    id: "dermatology",
    descriptionUrl:
      "Dermatology focuses on the diagnosis and treatment of skin, hair, and nail disorders. It encompasses a wide range of conditions, from acne and eczema to skin cancer. Dermatologists provide essential care to maintain skin health and address cosmetic concerns, ensuring patients achieve optimal skin appearance and function.\n\nDr. Sangeeth Kumar specializes in advanced dermatological treatments, addressing a wide range of skin concerns. From Vitiligo, which causes skin discoloration, to Acne and Eczema, he offers tailored solutions for each condition. His expertise extends to Dermatosurgeries for minor yet bothersome issues, Hair Transplants for restoring hair volume, and treatments for Nail Problems. Additionally, he effectively manages Excessive Sweating, ensuring comprehensive care for all skin and hair-related needs.",
    images: [
      "https://images.pexels.com/photos/16441671/pexels-photo-16441671/free-photo-of-a-young-woman-posing-with-a-beauty-product.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/789012/pexels-photo-789012.jpeg",
    ],
    name: "Dermatology",
    addOnDescription:
      "Explore various dermatological treatments and skincare options.",
  },
  {
    id: "cosmetology",
    descriptionUrl:
      "Cosmetology is a branch of science that focuses on beauty treatment. It encompasses a variety of services including skincare, makeup, hair styling, and nail care. Cosmetologists are trained to enhance the appearance of their clients through various techniques and products.",
    images: [
      "https://images.pexels.com/photos/123457/pexels-photo-123457.jpeg",
      "https://images.pexels.com/photos/789013/pexels-photo-789013.jpeg",
    ],
    name: "Cosmetology",
    addOnDescription:
      "Discover a range of beauty treatments and services tailored to enhance your appearance.",
  },
  {
    id: "trichology",
    descriptionUrl:
      "Trichology is the branch of dermatology that deals with the study and treatment of hair and scalp disorders. Trichologists specialize in diagnosing and treating conditions such as hair loss, dandruff, and scalp irritation, providing solutions to maintain healthy hair.",
    images: [
      "https://images.pexels.com/photos/123458/pexels-photo-123458.jpeg",
      "https://images.pexels.com/photos/789014/pexels-photo-789014.jpeg",
    ],
    name: "Trichology",
    addOnDescription: "Explore effective treatments for hair and scalp health.",
  },
];

export const treamentList: TreatmentType[] = [
  {
    id: "1",
    name: "Vitilogo",
    image: "https://www.episkin.in/images/services/large/vitilogo_l.webp",
    description:
      "Vitiligo A disease that causes the loss of skin colour in blotches. The patches of skin affected become white and usually have sharp margins. The hair from the skin may also become white. Vitiligo is a condition in which the skin loses its pigment cells (melanocytes). Vitiligo occurs when pigment-producing cells die or stop functioning.",
    discount: 300,
    amount: 1200,
  },
  {
    id: "2",
    name: "Acne(Pimples)",
    image: "https://www.episkin.in/images/services/large/acne_l.webp",
    description:
      "Acne is a common skin condition that occurs when dead skin cells and oil from the skin clog hair follicles. Blackheads, whiteheads, pimples, oily skin, etc are some typical features. The resulting appearance can lead to anxiety, reduced self-esteem, and in extreme cases depression. There are various options to treat/cure your acne, but finding the right one is most important.",
    discount: 300,
    amount: 1200,
  },
  {
    id: "3",
    name: "Dermatosurgeries",
    image: "https://www.episkin.in/images/services/large/dermato_l.webp",
    description:
      "They seem to be small but frustrating and irritating problems. Above mentioned problems are usually faced by many and often neglected. Thankfully there are many surgical methods are available to solve the mentioned problems.",
    discount: 300,
    amount: 1200,
  },
  {
    id: "4",
    name: "Excessive sweating",
    image:
      "https://www.episkin.in/images/services/large/excessive_sweating_l.webp",
    description:
      "Excessive sweating, or hyper-hidrosis, many suffer from this and very uncomfortable. And it can be a warning sign of thyroid problems, diabetes, or infection. Excessive sweating is also more common in people who are overweight.The good news is that Excessive sweating can be treated very easily.",
    discount: 300,
    amount: 1200,
  },
  {
    id: "5",
    name: "Eczema",
    image: "https://www.episkin.in/images/services/large/eczema_l.webp",
    description:
      "Eczema is also known as atopic dermatitis is a term for a group of conditions that make your skin inflamed or irritated.Atopic dermatitis usually develops in early childhood and is more common in people who have a family history of the condition.",
    discount: 300,
    amount: 1200,
  },
  {
    id: "6",
    name: "Hair-Transplant",
    image:
      "https://www.episkin.in/images/services/large/hair_transplant_l.webp",
    description:
      "Hair transplantation is a surgical method that removes hair follicles from a hair filled area to a bald area. This is an advanced hair replacement method with zero side effects.Hair transplants are done to add more hair to an area on your head that is thinning or balding. This method is used to reverse the baldness and provide hair volume and natural growth.",
    discount: 300,
    amount: 1200,
  },
  {
    id: "7",
    name: "Nail Problems",
    image: "https://www.episkin.in/images/services/large/nail_problems_l.webp",
    description:
      "Common causes of fingernail problems include injury, infection, and various skin diseases.Causes of toenail problems include trauma, ill-fitting shoes, poor circulation, poor nerve supply, and infection. Pain, itching, and discolouration are just some of the signs of toenail problems. There are many types of nail problems",
    discount: 300,
    amount: 1200,
  },
];

export const facilities: FacilityType[] = [
  {
    id: "1",
    name: "Fitness Center",
    description:
      "A state-of-the-art gym equipped with modern machines and personal trainers.",
    image: "https://www.episkin.in/images/services/large/nail_problems_l.webp",
  },
  {
    id: "2",
    name: "Swimming Pool",
    description:
      "An outdoor swimming pool with a separate kids' area and a lounge deck.",
    image: "https://www.episkin.in/images/services/large/nail_problems_l.webp",
  },
  {
    id: "3",
    name: "Conference Room",
    description:
      "A fully equipped conference room with seating for 50 and high-speed Wi-Fi.",
    image: "https://www.episkin.in/images/services/large/nail_problems_l.webp",
  },
  {
    id: "4",
    name: "Spa and Wellness",
    description:
      "A luxurious spa offering massages, facials, and wellness treatments.",
    image: "https://www.episkin.in/images/services/large/nail_problems_l.webp",
  },
  {
    id: "5",
    name: "Cafeteria",
    description:
      "A multi-cuisine cafeteria with a variety of healthy and delicious food options.",
    image: "https://www.episkin.in/images/services/large/nail_problems_l.webp",
  },
  {
    id: "6",
    name: "Parking Facility",
    description:
      "Ample parking space with 24/7 security and EV charging stations.",
    image: "https://www.episkin.in/images/services/large/nail_problems_l.webp",
  },
];

// export const AppointmentDetails: BookingDetailType = {
//   id: "12123123",
//   createdOn: "2024-12-01T10:25:00.000",
//   comments: "",
//   status: "WAITING",
//   slotTime: "1999-01-01T14:00:00.000",
//   slotDay: "2024-12-03T00:00:00.000",
//   fee: 900,
//   paymentStatus: "PAID",
//   referenceNo: "9A612123",
//   userId: "",
//   memberId: "",
//   userInfo: {
//     name: "Neha Shetty",
//     age: "26",
//     gender: "Female",
//     phone: "6303467186",
//     email: "kira@gmail.com",
//   },
//   memberInfo: {
//     name: "Dr. Sangeeth",
//     specialisation: "",
//     experience: "",
//     address: "",
//   },
//   hospitalInfo: {
//     id: "123",
//     name: "AIIMS",
//     address: "AIIMS, New Delhi",
//     phone: "9876543210",
//     createdOn: "2024-12-01T10:25:00.000",
//     email: "aiims@gmail.com",
//   },
// };

const docDescriptionTxt = (
  <div className="text-sm space-y-4 leading-6 tracking-wider font-medium  font-sans text-neutral-700">
    <p>
      Dr Sangeeth, MD DVL, is an experienced, fellowship-trained Specialising in
      Dermatology, Cosmetology and Trichology.
    </p>
    <p>
      Dr Sangeeth is the best Hair and Skin Doctor in Boduppal & Malkajgiri,
      Hyderabad, having performed over 33,00+ procedures (2100+ skin related and
      1200+ hair related).
    </p>
    <p>
      Dr Sangeeth has performed thousands of treatments and procedures, his
      areas of expertise are Acne treatments, Vitiligo treatments, and PRP for
      Hair treatment. As a highly expert, Dr. Sangeeth use medically advanced
      treatments like Mesotherapy, PRP (Platelet Rich Plasma) therapy and has
      extensive experience with issues related to Pimples, Scars, Psoriasis,
      Eczema.
    </p>
    <p>
      Dr Sangeeth is Gold Medalist in MBBS, from Kamineni Institute of Medical
      Sciences. He did his masters (MD DVL) in Dermatology from Kakatiya
      University. And university topper in DVL from Dr.NTR university of health
      sciences. He has completed his senior residency from Osmania Medical
      College.
    </p>

    <p>
      Dr Sangeeth served as Asst Professor at RVM Institute of Medical Sciences
      for 3 years. He worked with Kaya Skin Clinic for short stint as consultant
      Dermatologist, Cosmetologist and Trichologist.
    </p>

    <p>
      Dr. Sangeeth is a speaker and panellist at various state and national CMEs
      and medical conferences. And has 2 publications to his credit as an expert
      in his subject area.
    </p>

    <p>
      Dr Sangeeth is the expert hair and skin care Doctor in Boduppal &
      Malkajgiri, Hyderabad., to use result oriented treatments on his patients.
    </p>

    <p>
      Dr Sangeeth is known for his expertise and experience along with his
      special care for his patients, and the ability to use the most advanced
      medical treatments.
    </p>
  </div>
);

// export const doctorInfo: DoctorType = {
//   id: "doc123",
//   slugId: "dr-sangeeth-kumar-k",
//   name: "Dr. Sangeeth Kumar.K",
//   description: docDescriptionTxt,
//   consultFee: 150,
//   discount: 10,
//   languages: ["ENG", "TEL", "HIN"],
//   experience: "6+ years as specialist",
//   registrationNo: "REG-456789",
//   timings: {
//     0: [{ from: "09:00", to: "12:00" }], // Monday
//     1: [{ from: "09:00", to: "12:00" }], // Tuesday
//     2: [{ from: "09:00", to: "12:00" }], // Wednesday
//     3: [{ from: "09:00", to: "12:00" }], // Thursday
//     4: [{ from: "09:00", to: "12:00" }], // Friday
//   },
//   qualification: "MBBS,MD DVL",
//   image: "https://www.episkin.in/images/team/Dr_g_revanth.webp",
//   isAvailable: true,
//   slotDuration: 30,
//   specialisations: ["Consultant Dermatologist", "Cosmetologist & Trichologist"],
//   rating: {
//     value: 4.8,
//     totalCount: 150,
//   },
//   specializationName: "Dermatology",
//   accuracy: 90,
// };

export const reviewList: ReviewType[] = [
  {
    id: "1",
    date: new Date("2024-12-02T10:30:00.000"),
    name: "Satish Kumar",
    rating: "4",
    review: "Really great experience...",
    doctorId: "doc123",
    doctorName: "Dr. Sangeeth Kumar.K",
    reviewId: "rev_1",
  },
  {
    id: "2",
    date: new Date("2024-11-20T05:20:00.000"),
    name: "Pranav",
    rating: "4.5",
    review:
      "I've been having my skin condition for a few years now and a couple doctor visits later it still didn't get any better. But then I was suggested to visit Dr.Sangeeth and things started to change . He carefully explained everything",
    doctorId: "doc123",
    doctorName: "Dr. Sangeeth Kumar.K",
    reviewId: "rev_2",
  },
  {
    id: "3",
    date: new Date("2024-11-03T10:30:00.000"),
    name: "Krishna Kumar",
    rating: "5",
    review:
      "I had a wonderful experience with Dr Sangeeth Kumar for Skin and allergy problem What really impressed me was the level of patience they showed throughout the entire consultation.",
    doctorId: "doc123",
    doctorName: "Dr. Sangeeth Kumar.K",
    reviewId: "rev_3",
  },
  {
    id: "4",
    date: new Date("2024-10-02T10:30:00.000"),
    name: "Shavina Parvin",
    rating: "3.5",
    review:
      "I have visited Dr Sangeetha for my any skin and hair treatments and got good results every time. I highly recommend him. He is kind and compassionate towards his patients and work. ",
    doctorId: "doc123",
    doctorName: "Dr. Sangeeth Kumar.K",
    reviewId: "rev_4",
  },
  {
    id: "5",
    date: new Date("2024-10-01T10:30:00.000"),
    name: "Sampath Goura",
    rating: "4.5",
    review:
      "My daughter Rohini she suffer Urticaria we consult Dr.Sangeeth Kumar Dermotologist episkin clinic, boduppal he treated op basis giving oral medication she recovered well. excellent treatment doctor is excellent he spoke friendly and very polite I suggested this doctor. ",
    doctorId: "doc123",
    doctorName: "Dr. Sangeeth Kumar.K",
    reviewId: "rev_5",
  },
];

// export const doctorList: DoctorType[] = [
//   {
//     id: "doc_001",
//     slugId: "dr-sarah-smith",
//     name: "Dr. Sarah Smith",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.8,
//       totalCount: 127,
//     },
//     consultFee: 1500,
//     specializationName: "Cardiology",
//     experience: "15 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-001",
//     specialisations: ["Cardiologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_002",
//     slugId: "dr-james-wilson",
//     name: "Dr. James Wilson",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.5,
//       totalCount: 89,
//     },
//     consultFee: 1200,
//     specializationName: "Pediatrics",
//     experience: "8 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-002",
//     specialisations: ["Pediatrician"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_003",
//     slugId: "dr-emily-chen",
//     name: "Dr. Emily Chen",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.9,
//       totalCount: 203,
//     },
//     consultFee: 1800,
//     specializationName: "Neurology",
//     experience: "12 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-003",
//     specialisations: ["Neurologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_001",
//     slugId: "dr-sarah-smith",
//     name: "Dr. Sarah Smith",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.8,
//       totalCount: 127,
//     },
//     consultFee: 1500,
//     specializationName: "Cardiology",
//     experience: "15 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-001",
//     specialisations: ["Cardiologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_002",
//     slugId: "dr-james-wilson",
//     name: "Dr. James Wilson",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.5,
//       totalCount: 89,
//     },
//     consultFee: 1200,
//     specializationName: "Pediatrics",
//     experience: "8 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-002",
//     specialisations: ["Pediatrician"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_003",
//     slugId: "dr-emily-chen",
//     name: "Dr. Emily Chen",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.9,
//       totalCount: 203,
//     },
//     consultFee: 1800,
//     specializationName: "Neurology",
//     experience: "12 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-003",
//     specialisations: ["Neurologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_001",
//     slugId: "dr-sarah-smith",
//     name: "Dr. Sarah Smith",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.8,
//       totalCount: 127,
//     },
//     consultFee: 1500,
//     specializationName: "Cardiology",
//     experience: "15 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-001",
//     specialisations: ["Cardiologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_002",
//     slugId: "dr-james-wilson",
//     name: "Dr. James Wilson",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.5,
//       totalCount: 89,
//     },
//     consultFee: 1200,
//     specializationName: "Pediatrics",
//     experience: "8 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-002",
//     specialisations: ["Pediatrician"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_003",
//     slugId: "dr-emily-chen",
//     name: "Dr. Emily Chen",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.9,
//       totalCount: 203,
//     },
//     consultFee: 1800,
//     specializationName: "Neurology",
//     experience: "12 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-003",
//     specialisations: ["Neurologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_001",
//     slugId: "dr-sarah-smith",
//     name: "Dr. Sarah Smith",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.8,
//       totalCount: 127,
//     },
//     consultFee: 1500,
//     specializationName: "Cardiology",
//     experience: "15 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-001",
//     specialisations: ["Cardiologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_002",
//     slugId: "dr-james-wilson",
//     name: "Dr. James Wilson",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.5,
//       totalCount: 89,
//     },
//     consultFee: 1200,
//     specializationName: "Pediatrics",
//     experience: "8 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-002",
//     specialisations: ["Pediatrician"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_003",
//     slugId: "dr-emily-chen",
//     name: "Dr. Emily Chen",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.9,
//       totalCount: 203,
//     },
//     consultFee: 1800,
//     specializationName: "Neurology",
//     experience: "12 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-003",
//     specialisations: ["Neurologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_001",
//     slugId: "dr-sarah-smith",
//     name: "Dr. Sarah Smith",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.8,
//       totalCount: 127,
//     },
//     consultFee: 1500,
//     specializationName: "Cardiology",
//     experience: "15 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-001",
//     specialisations: ["Cardiologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_002",
//     slugId: "dr-james-wilson",
//     name: "Dr. James Wilson",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.5,
//       totalCount: 89,
//     },
//     consultFee: 1200,
//     specializationName: "Pediatrics",
//     experience: "8 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-002",
//     specialisations: ["Pediatrician"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_003",
//     slugId: "dr-emily-chen",
//     name: "Dr. Emily Chen",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.9,
//       totalCount: 203,
//     },
//     consultFee: 1800,
//     specializationName: "Neurology",
//     experience: "12 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-003",
//     specialisations: ["Neurologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_001",
//     slugId: "dr-sarah-smith",
//     name: "Dr. Sarah Smith",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.8,
//       totalCount: 127,
//     },
//     consultFee: 1500,
//     specializationName: "Cardiology",
//     experience: "15 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-001",
//     specialisations: ["Cardiologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_002",
//     slugId: "dr-james-wilson",
//     name: "Dr. James Wilson",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.5,
//       totalCount: 89,
//     },
//     consultFee: 1200,
//     specializationName: "Pediatrics",
//     experience: "8 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-002",
//     specialisations: ["Pediatrician"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_003",
//     slugId: "dr-emily-chen",
//     name: "Dr. Emily Chen",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.9,
//       totalCount: 203,
//     },
//     consultFee: 1800,
//     specializationName: "Neurology",
//     experience: "12 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-003",
//     specialisations: ["Neurologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_001",
//     slugId: "dr-sarah-smith",
//     name: "Dr. Sarah Smith",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.8,
//       totalCount: 127,
//     },
//     consultFee: 1500,
//     specializationName: "Cardiology",
//     experience: "15 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-001",
//     specialisations: ["Cardiologist"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_002",
//     slugId: "dr-james-wilson",
//     name: "Dr. James Wilson",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.5,
//       totalCount: 89,
//     },
//     consultFee: 1200,
//     specializationName: "Pediatrics",
//     experience: "8 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-002",
//     specialisations: ["Pediatrician"],
//     accuracy: 90,
//   },
//   {
//     id: "doc_003",
//     slugId: "dr-emily-chen",
//     name: "Dr. Emily Chen",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
//     rating: {
//       value: 4.9,
//       totalCount: 203,
//     },
//     consultFee: 1800,
//     specializationName: "Neurology",
//     experience: "12 years",
//     discount: 0,
//     languages: ["ENG"],
//     timings: {},
//     qualification: "MBBS, MD",
//     isAvailable: true,
//     slotDuration: 30,
//     registrationNo: "REG-003",
//     specialisations: ["Neurologist"],
//     accuracy: 90,
//   },
// ];

// export const notificationList: NotificationType[] = [
//   {
//     id: "1",
//     title: "New Appointment",
//     message: "You have a new appointment on 2024-12-02 at 10:30 AM",
//     createdOn: new Date(
//       new Date().getTime() - 1000 * 60 * 60 * 24
//     ).toISOString(),
//   },
//   {
//     id: "2",
//     title: "New Appointment",
//     message: "You have a new appointment on 2024-12-02 at 10:30 AM",
//     createdOn: new Date(
//       new Date().getTime() - 1000 * 60 * 60 * 24
//     ).toISOString(),
//   },
//   {
//     id: "3",
//     title: "New Appointment",
//     message: "You have a new appointment on 2024-12-02 at 10:30 AM",
//     createdOn: new Date().toISOString(),
//   },
//   {
//     id: "4",
//     title: "New Appointment",
//     message: "You have a new appointment on 2024-12-02 at 10:30 AM",
//     createdOn: new Date().toISOString(),
//   },
//   {
//     id: "5",
//     title: "New Appointment",
//     message: "You have a new appointment on 2024-12-02 at 10:30 AM",
//     createdOn: new Date(
//       new Date().getTime() - 1000 * 60 * 60 * 24 * 5
//     ).toISOString(),
//   },
// ];
