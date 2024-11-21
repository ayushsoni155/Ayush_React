const labManualsObj = [
  {
    id: 1,
    name: "Engineering Chemistry",
    description: "it teaches about the concepts of chemical reactions",
    Sem: "1st",
    branch: "CSE",
    Subject_code: "BT101",
    Price: 1,
    image: "/Eng_Chemistry.png"
  },
  {
    id: 2,
    name: "Basic Electrical & Electronics Engineering",
    description: "it shows how the electric or electronic items work",
    Sem: "1st",
    branch: "CSE",
    Subject_code: "BT104",
    Price: 50,
    image: "/Eng_Beee.png"
  },
  {
    id: 3,
    name: "Manufacturing practice",
    description: "it teaches about how the things are made out of raw materials",
    Sem: "1st",
    branch: "CSE",
    Subject_code: "BT106",
    Price: 50,
    image: "/Eng_MP.png"
  },
  {
    id: 4,
    name: "Engineering Physics",
    description: "it teaches about fundamental concept of physics",
    Sem: "2nd",
    branch: "CSE",
    Subject_code: "BT201",
    Price: 50,
    image: "/Eng_Physics.png"
  },
  {
    id: 5,
    name: "Basic Machenical Engineering",
    description: "it introduces the fundamental concepts of machenics",
    Sem: "2nd",
    branch: "CSE",
    Subject_code: "BT203",
    Price: 50,
    image: "/Eng_Mechanical.png"
  },
  {
    id: 6,
    name: "Basic Civil Engineering & Mechanics",
    description: "it covers the fundamental concepts of civil engineering",
    Sem: "2nd",
    branch: "CSE",
    Subject_code: "BT204",
    Price: 50,
    image: "/Eng_Civil.png"
  },
  {
    id: 7,
    name: "Basic Computer Engineering",
    description: "it teaches about C++ programming language",
    Sem: "2nd",
    branch: "CSE",
    Subject_code: "BT205",
    Price: 50,
    image: "/Eng_BasicComputer.png"
  },
  {
    id: 8,
    name: "Data Structure",
    description: "it makes you strong to build the concept of any program",
    Sem: "3rd",
    branch: "CSE",
    Subject_code: "CS303",
    Price: 50,
    image: "/Eng_DSA.png"
  },
  {
    id: 9,
    name: "Digital System",
    description: "how logic gates & digital signals perform their tasks",
    Sem: "3rd",
    branch: "CSE",
    Subject_code: "CS304",
    Price: 50,
    image: "/Eng_DigitalSystem.png"
  },
  {
    id: 10,
    name: "Object Oriented Programming & Methodology",
    description: "it's focused on the concepts of Object Oriented Programming",
    Sem: "3rd",
    branch: "CSE",
    Subject_code: "CS305",
    Price: 50,
    image: "/Eng_OOP.png"
  },
  {
    id: 11,
    name: "Analysis Design of Algorithm",
    description: "it teaches how algorithms are written",
    Sem: "4th",
    branch: "CSE",
    Subject_code: "CS402",
    Price: 50,
    image: "/Eng_ADA.png"
  },
  {
    id: 12,
    name: "Software engineering",
    description: "it shows how software is built",
    Sem: "4th",
    branch: "CSE",
    Subject_code: "CS403",
    Price: 50,
    image: "/Eng_SE.png"
  },
  {
    id: 13,
    name: "Computer Org. & Architecture",
    description: "it talks about the architecture of a computer system",
    Sem: "4th",
    branch: "CSE",
    Subject_code: "CS404",
    Price: 50,
    image: "/Eng_COA.png"
  },
  {
    id: 14,
    name: "Operating System",
    description: "it covers how the operating systems work",
    Sem: "4th",
    branch: "CSE",
    Subject_code: "CS405",
    Price: 50,
    image: "/Eng_OS.png"
  },
  {
    id: 15,
    name: "JAVA",
    description: "To learn the programming language JAVA",
    Sem: "4th",
    branch: "CSE",
    Subject_code: "CS406",
    Price: 50,
    image: "/Eng_Java.png"
  },
  {
    id: 16,
    name: "Theory of Computation",
    description: "it studies how computers are solving the problems",
    Sem: "5th",
    branch: "CSE",
    Subject_code: "CS501",
    Price: 50,
    image: "/Eng_TOC.png"
  },
  {
    id: 17,
    name: "Database Management Systems",
    description: "it studies how to make databases",
    Sem: "5th",
    branch: "CSE",
    Subject_code: "CS502",
    Price: 50,
    image: "/Eng_DBMS.png"
  },
  {
    id: 18,
    name: "Linux",
    description: "it studies about installation of Linux OS",
    Sem: "5th",
    branch: "CSE",
    Subject_code: "CS505",
    Price: 50,
    image: "/Eng_Linux.png"
  },
  {
    id: 19,
    name: "Python",
    description: "learn the programming language Python",
    Sem: "5th",
    branch: "CSE",
    Subject_code: "CS506",
    Price: 50,
    image: "/Eng_Python.png"
  },
  {
    id: 20,
    name: "Machine Learning",
    description: "Learn the concepts of machine learning",
    Sem: "6th",
    branch: "CSE",
    Subject_code: "CS601",
    Price: 50,
    image: "/Eng_ML.png"
  },
  {
    id: 22,
    name: "Computer Networks",
    description: "it covers how the computers are connected to each other",
    Sem: "6th",
    branch: "CSE",
    Subject_code: "CS602",
    Price: 50,
    image: "/Eng_ComputerNetwork.png"
  },
  {
    id: 22,
    name: "Data Analytics",
    description: "it focuses on how data is transferred between others",
    Sem: "6th",
    branch: "CSE",
    Subject_code: "CS605",
    Price: 50,
    image: "/Eng_DataAnalytics.png"
  },
  {
    id: 23,
    name: "Skill Development",
    description: "To develop your skills",
    Sem: "6th",
    branch: "CSE",
    Subject_code: "CS606",
    Price: 50,
    image: "/Eng_SkillDevelopment.png"
  },
  {
    id: 24,
    name: "Big Data",
    description: "it teaches how big forms of data are stored, managed, or analyzed",
    Sem: "7th",
    branch: "CSE",
    Subject_code: "CS704",
    Price: 50,
    image: "/Eng_BigData.png"
  },
  {
    id: 25,
    name: "Data Mining & warehousing",
    description: "",
    Sem: "7th",
    branch: "CSE",
    Subject_code: "CS705",
    Price: 50,
    image: "/Eng_DMW.png"
  }
];

export default labManualsObj;
