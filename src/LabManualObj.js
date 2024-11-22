const labManualsObj = [
  {
    id: 1,
    name: "Engineering Chemistry",
    description: "it teaches about the concepts of chemical reactions",
    Sem: "1st",
    branch: "CSE",
    Subject_code: "BT101",
    Price: 1,
    image: "/Eng_Chemistry.png",
    Pages:50
  },
  {
    id: 2,
    name: "Basic Electrical & Electronics Engineering",
    description: "it shows how the electric or electronic items work",
    Sem: "1st",
    branch: "CSE",
    Subject_code: "BT104",
    Price: 50,
    image: "/Eng_Beee.png",
    Pages:50
  },
  {
    id: 3,
    name: "Manufacturing practice",
    description: "it teaches about how the things are made out of raw materials",
    Sem: "1st",
    branch: "CSE",
    Subject_code: "BT106",
    Price: 50,
    image: "/Eng_MP.png",
    Pages:52
  },
  {
    id: 4,
    name: "Engineering Physics",
    description: "it teaches about fundamental concept of physics",
    Sem: "2nd",
    branch: "CSE",
    Subject_code: "BT201",
    Price: 50,
    image: "/Eng_Physics.png",
    Pages:50

  },
  {
    id: 5,
    name: "Basic Machenical Engineering",
    description: "it introduces the fundamental concepts of machenics",
    Sem: "2nd",
    branch: "CSE",
    Subject_code: "BT203",
    Price: 50,
    image: "/Eng_Mechanical.png",
    Pages:55
  },
  {
    id: 6,
    name: "Basic Civil Engineering & Mechanics",
    description: "it covers the fundamental concepts of civil engineering",
    Sem: "2nd",
    branch: "CSE",
    Subject_code: "BT204",
    Price: 50,
    image: "/Eng_Civil.png",
    Pages:69
  },
  {
    id: 7,
    name: "Basic Computer Engineering",
    description: "it teaches about C++ programming language",
    Sem: "2nd",
    branch: "CSE",
    Subject_code: "BT205",
    Price: 50,
    image: "/Eng_BasicComputer.png",
    Pages:54
  },
  {
    id: 8,
    name: "Data Structure",
    description: "it makes you strong to build the concept of any program",
    Sem: "3rd",
    branch: "CSE",
    Subject_code: "CS303",
    Price: 50,
    image: "/Eng_DSA.png",
    Pages:15

  },
  {
    id: 9,
    name: "Digital System",
    description: "how logic gates & digital signals perform their tasks",
    Sem: "3rd",
    branch: "CSE",
    Subject_code: "CS304",
    Price: 50,
    image: "/Eng_DigitalSystem.png",
    Pages:52

  },
  {
    id: 10,
    name: "Object Oriented Programming & Methodology",
    description: "it's focused on the concepts of Object Oriented Programming",
    Sem: "3rd",
    branch: "CSE",
    Subject_code: "CS305",
    Price: 50,
    image: "/Eng_OOP.png",
    Pages:25

  },
 {
    id: 11,
    name: "Computer Workshop",
    description: "it's teaches you about the personal computer system",
    Sem: "3rd",
    branch: "CSE",
    Subject_code: "CS306",
    Price: 50,
    image: "/ComputerWorkshop.avif",
    Pages:25

  },
  {
    id: 12,
    name: "Analysis Design of Algorithm",
    description: "it teaches how algorithms are written",
    Sem: "4th",
    branch: "CSE",
    Subject_code: "CS402",
    Price: 50,
    image: "/Eng_ADA.png",
    Pages:18

  },
  {
    id: 13,
    name: "Software engineering",
    description: "it shows how software is built",
    Sem: "4th",
    branch: "CSE",
    Subject_code: "CS403",
    Price: 50,
    image: "/Eng_SE.png",
    Pages:12

  },
  {
    id: 14,
    name: "Computer Org. & Architecture",
    description: "it talks about the architecture of a computer system",
    Sem: "4th",
    branch: "CSE",
    Subject_code: "CS404",
    Price: 50,
    image: "/Eng_COA.png",
    Pages:15

  },
  {
    id: 15,
    name: "Operating System",
    description: "it covers how the operating systems work",
    Sem: "4th",
    branch: "CSE",
    Subject_code: "CS405",
    Price: 50,
    image: "/Eng_OS.png",
    Pages:26

  },
  {
    id: 16,
    name: "JAVA",
    description: "To learn the programming language JAVA",
    Sem: "4th",
    branch: "CSE",
    Subject_code: "CS406",
    Price: 50,
    image: "/Eng_Java.png",
    Pages:16},
  {
    id: 17,
    name: "Theory of Computation",
    description: "it studies how computers are solving the problems",
    Sem: "5th",
    branch: "CSE",
    Subject_code: "CS501",
    Price: 50,
    image: "/Eng_TOC.png",
    Pages:14

  },
  {
    id: 18,
    name: "Database Management Systems",
    description: "it studies how to make databases",
    Sem: "5th",
    branch: "CSE",
    Subject_code: "CS502",
    Price: 50,
    image: "/Eng_DBMS.png",
    Pages:50

  },
  {
    id: 19,
    name: "Linux",
    description: "it studies about installation of Linux OS",
    Sem: "5th",
    branch: "CSE",
    Subject_code: "CS505",
    Price: 50,
    image: "/Eng_Linux.png",
    Pages:50

  },
  {
    id: 20,
    name: "Python",
    description: "learn the programming language Python",
    Sem: "5th",
    branch: "CSE",
    Subject_code: "CS506",
    Price: 50,
    image: "/Eng_Python.png",
    Pages:17

  },
  {
    id: 21,
    name: "Machine Learning",
    description: "Learn the concepts of machine learning",
    Sem: "6th",
    branch: "CSE",
    Subject_code: "CS601",
    Price: 50,
    image: "/Eng_ML.png",
    Pages:50

  },
  {
    id: 22,
    name: "Computer Networks",
    description: "it covers how the computers are connected to each other",
    Sem: "6th",
    branch: "CSE",
    Subject_code: "CS602",
    Price: 50,
    image: "/Eng_ComputerNetwork.png",
    Pages:23

  },
  {
    id: 23,
    name: "Data Analytics",
    description: "it focuses on how data is transferred between others",
    Sem: "6th",
    branch: "CSE",
    Subject_code: "CS605",
    Price: 50,
    image: "/Eng_DataAnalytics.png",
    Pages:50

  },
  {
    id: 24,
    name: "Skill Development",
    description: "To develop your skills",
    Sem: "6th",
    branch: "CSE",
    Subject_code: "CS606",
    Price: 50,
    image: "/Eng_SkillDevelopment.png",
    Pages:15

  },
  {
    id: 25,
    name: "Big Data",
    description: "it teaches how big forms of data are stored, managed, or analyzed",
    Sem: "7th",
    branch: "CSE",
    Subject_code: "CS704",
    Price: 50,
    image: "/Eng_BigData.png",
    Pages:12

  },
  {
    id: 26,
    name: "Data Mining & warehousing",
    description: "",
    Sem: "7th",
    branch: "CSE",
    Subject_code: "CS705",
    Price: 50,
    image: "/Eng_DMW.png",
    Pages:24

  }
];

export default labManualsObj;
