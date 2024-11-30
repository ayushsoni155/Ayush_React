const notesArray = [
    {
        name: "Engineering Chemistry",
        Subject_code: "BT101",
        Sem: "1",
        description: "It focuses on the study of chemical principles and their applications in engineering.",
        image: '/Eng_Chemistry.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/12jqyqHBLfj14eA0_mbrrqGqZRNoD-lB4/view?usp=drive_link'
    },

    {
        name: "Mathematics - I (M1)",
        Subject_code: "BT102",
        Sem: "1",
        description: "It covers basic concepts of calculus, algebra, and geometry.",
        image: '/Eng_M1.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1gqbIRu2xXJAT5pEwqoUAIDOhUWY_9cZp/view?usp=drive_link'
    },
    {
        name: "English for Communication",
        Subject_code: "BT103",
        Sem: "1",
        description: "It focuses on improving language skills like speaking, writing, listening, and reading.",
        image: '/Eng_EnglishForCommunication.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/13gYvguWN2g75BJlXc-xI2wVO-qz8WmCW/view?usp=drive_link'
    },
    {
        name: "Basic Electrical and Electronics Engineering",
        Subject_code: "BT104",
        Sem: "1",
        description: "It covers fundamental concepts of electricity, circuits, electrical machines, and electronic devices.",
        image: '/Eng_Beee.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/11P5lvWOlqpsryfFwhrtTfWCsSLL3V-np/view?usp=drive_link'
        },
    {
        name: "Engineering Graphics",
        Subject_code: "BT105",
        Sem: "1",
        description: " It teaches the basics of technical drawing, including projections, drafting, and visualization of objects.",
        image: '/Eng_Ed.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1RND6ne6eK5Y2j_dvS-3I_MKwSufNPg35/view?usp=drive_link'
    },
    {
        name: "Engineering Physics",
        Subject_code: "BT201",
        Sem: "2",
        description: " It explores the fundamental principles of physics and their applications in engineering.",
        image: '/Eng_Physics.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1cgza6zjv8zZgQS6PE133jkCxM5Vri6tn/view?usp=drive_link'
        },
    {
        name: "Mathematics - II (M2)",
        Subject_code: "BT202",
        Sem: "2",
        description: "It focuses on advanced calculus, differential equations, and vector analysis, essential for solving complex engineering problems.",
        image: '/Eng_M2.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1TgIvHSAbw6AWB29VPs8zcE6gDPg6XoK_/view?usp=drive_link'
        },
    {
        name: "Basic Mechanical Engineering",
        Subject_code: "BT203",
        Sem: "2",
        description: "It introduces fundamental concepts of mechanics, thermodynamics, and material science.",
        image: '/Eng_Mechanical.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1MereSrMbXk_bSbLyVzOKpEbqjw4yVoy8/view?usp=drive_link'
    },
    {
        name: "Basic Civil Engineering & Mechanics",
        Subject_code: "BT204",
        Sem: "2",
        description: "It covers fundamental principles of civil engineering, including structures, materials, and mechanics.",
        image: '/Eng_Civil.png',
        branch: "CSE",
        pdfUrl: "https://drive.google.com/file/d/1Kan0iRFTMCXqkTfgjeaU_KEe-VNhFsmg/view?usp=drive_link"
    },
    {
        name: "Basic Computer Engineering",
        Subject_code: "BT205",
        Sem: "2",
        description: "It essential for understanding how computers and software work.",
        image: '/Eng_BasicComputer.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1jhCw6aiEw1yJZSJgTFBUUYJLo-DDn-rV/view?usp=drive_link'
        },
    {
        name: "Energy & Environmental Engineering",
        Subject_code: "ES301",
        Sem: "3",
        description: " It focuses on the study of energy systems, sustainability, and environmental protection.",
        image: '/Eng_EEE.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1oOirr4nd0GI3a0dMhQqd7XdpHWq1CjWb/view?usp=drive_link'
    },
    {
        name: "Discrete Structure",
        Subject_code: "CS302",
        Sem: "3",
        description: "It studies mathematical concepts related to countable, distinct objects, logic, set theory, graph theory, and combinatorics.",
        image: '/Eng_Discret.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1EwafrpJq-_TZcF_ZIRhLv8-jBb-C4wKG/view?usp=drive_link'
    },
    {
        name: "Data Structure",
        Subject_code: "CS303",
        Sem: "3",
        description: "It focuses on organizing and storing data efficiently.",
        image: '/Eng_DSA.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1QcLPJ5TDu9rwVO1dav13cWxN26Hk6Ck2/view?usp=drive_link'
    },
    {
        name: "Digital Systems",
        Subject_code: "CS304",
        Sem: "3",
        description: " It studies about logic gates, number systems, and digital signal processing.",
        image: '/Eng_DigitalSystem.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1yS8Q1wfkmFATaFrkR4d8Ps_04vYUVqWZ/view?usp=drive_link'
    },
    {
        name: "Object-Oriented Programming & Methodology",
        Subject_code: "CS305",
        Sem: "3",
        description: "It emphasizing principles like encapsulation, inheritance, and polymorphism to create modular and reusable code.",
        image: '/Eng_OOP.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1dh1nkiDQCb0PSwvacoGmqI_zR5Y3u2mV/view?usp=drive_link'
    },
    {
        name: "Mathematics - III (M3)",
        Subject_code: "CS401",
        Sem: "4",
        description: "It covers advanced topics such as linear algebra, complex variables, and partial differential equations.",
        image: '/Eng_M3.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1KCp8NfjCRWNxylEwgDheskO4GNicYPsv/view?usp=drive_link'
    },
    {
        name: "Analysis and Design of Algorithms",
        Subject_code: "CS402",
        Sem: "4",
        description: "It teaches how to evaluate the performance of algorithms and create efficient solutions to problems.",
        image: '/Eng_ADA.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1FOWRFppsG_J-gz_0T1z29k5QJpFjRV9p/view?usp=drive_link'
    },
    {
        name: "Software Engineering",
        Subject_code: "CS403",
        Sem: "4",
        description: " It focuses on the systematic design, development, testing, and maintenance of software.",
        image: '/Eng_SE.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/10ERIY_tTKyKeBdJpp-NLnsrhh91ESjMt/view?usp=drive_link'
    },
    {
        name: "Computer Organization & Architecture",
        Subject_code: "CS404",
        Sem: "4",
        description: "It explains how computers are built and how they work, processor, memory, and data handling.",
        image: '/Eng_COA.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1B5kSymnMYQnvdiyAwA59R5YotBQbhKWy/view?usp=drive_link'
    },
    {
        name: "Operating System",
        Subject_code: "CS405",
        Sem: "4",
        description: "It explains how a computer works by managing hardware, running programs, and handling tasks like memory and storage.",
        image: '/Eng_OS.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1Gv5b-WbloLGryKbHuinBSQDsQHqE3tw8/view?usp=drive_link'
    },
    {
        name: "Theory of Computation",
        Subject_code: "CS501",
        Sem: "5",
        description: " It studies how computers solve problems.",
        image: '/Eng_TOC.png',
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1lKbTqGJdF00FwmirlmP_89mzs-ye-INF/view?usp=drive_link'
    },
    {
        name: "Database Management Systems",
        Subject_code: "CS502",
        Sem: "5",
        description: " (DBMS) store, organize, and manage data, allowing users to easily retrieve, update, and manipulate information.",
        image: '/Eng_DBMS.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1bCEfhoRivyyCWOhmKhCMljuiKV16fcz_/view?usp=drive_link'
    },
    {
        name: "Data Analytics",
        Subject_code: "CS503",
        Sem: "5",
        description: "It involves analyzing data to find patterns, make decisions, and solve problems using techniques.",
        image: '/Eng_DataAnalytics.png',
        branch: "CSE",
        pdfUrl: 'https://drive.google.com/file/d/1LflZPBKAryeoo7KWABeYGk49XH-jnktd/view?usp=drive_link'
    },
    /*{ 
        name: "Pattern Recognition", 
        Subject_code: "CS503", 
        Sem: "5th", 
        description: "It teaching computers to find and identify patterns in data, like recognizing faces in pictures or sounds in audio.", 
        image: '/noteimg.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    }, 
    { 
        name: "Cyber Security", 
        Subject_code: "CS503", 
        Sem: "5th", 
        description: "It focuses on protecting computers, networks, and data from attacks, theft, and damage.", 
        image: '/noteimg.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    },*/
    {
        name: "Internet and Web Technology",
        Subject_code: "CS504",
        Sem: "5",
        description: " It covers how the internet works and how websites are built.",
        image: '/Eng_IWT.png',
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1g3IKb9UUW-JKfK-1dAKqOWGRHEXYOY1h/view?usp=drive_link'
    },
    {
        name: "Machine Learning",
        Subject_code: "CS601",
        Sem: "6",
        description: "It teaches computers to learn from data and improve their performance on tasks.",
        image: '/Eng_ML.png',
        branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1gW_JyN7CYioi5g06xDwzZTQyCUXYZFmb/view'
    },
    {
        name: "Computer Network",
        Subject_code: "CS602",
        Sem: "6",
        description: "It focus on how computers connect and communicate with each other to share data and resources.",
        image: '/Eng_ComputerNetwork.png',
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1gW_JyN7CYioi5g06xDwzZTQyCUXYZFmb/view'
    },
    // { 
    //     name: "Advanced Computer Architecture", 
    //     Subject_code: "CS603", 
    //     Sem: "6th", 
    //     description: " It focusing on improving speed, efficiency, and performance in processing tasks.", 
    //     image: '/noteimg.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    // }, 
    // { 
    //     name: "Computer Graphics & Visualization", 
    //     Subject_code: "CS603", 
    //     Sem: "6th", 
    //     description: " It helping to visually represent data or designs.", 
    //     image: '/noteimg.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    // }, 
    {
        name: "Compiler Design",
        Subject_code: "CS603",
        Sem: "6",
        description: "It focuses on building programs (compilers) that translate code from one programming language to another.",
        image: '/Eng_CompilerDesign.png',
        branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1gW_JyN7CYioi5g06xDwzZTQyCUXYZFmb/view'
    },
    {
        name: "Project Management",
        Subject_code: "CS604",
        Sem: "6",
        description: " It is about gathering, organizing, and sharing information.",
        image: '/Eng_KnowledgeManagment.png',
         branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1gW_JyN7CYioi5g06xDwzZTQyCUXYZFmb/view'
    },
    {
        name: "Software Architectures",
        Subject_code: "CS701",
        Sem: "7",
        description: " It defining how different parts work together to meet requirements and design goals.",
        image: '/Eng_SoftwareArchitecture.jpg',
         branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1gW_JyN7CYioi5g06xDwzZTQyCUXYZFmb/view'
    },
    {
        name: "Big Data",
        Subject_code: "CS702",
        Sem: "7",
        description: " It refers to large and complex data sets that require special tools to store, analyze, and manage the data sets.",
        image: '/Eng_BigData.png',
         branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1gW_JyN7CYioi5g06xDwzZTQyCUXYZFmb/view'
    },
    // { 
    //     name: "Computational Intelligence", 
    //     Subject_code: "CS702", 
    //     Sem: "7th", 
    //     description: "It's teaching computers to think and learn like humans to solve tricky problems.", 
    //     image: '/noteimg.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    // }, 
    // { 
    //     name: "Deep & Reinforcement Learning", 
    //     Subject_code: "CS702", 
    //     Sem: "7th", 
    //     description: "It learn from mistakes and successes to make better decisions.", 
    //     image: '/noteimg.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    // }, 
    // { 
    //     name: "Wireless & Mobile Computing", 
    //     Subject_code: "CS702", 
    //     Sem: "7th", 
    //     description: "It teaches about to access the internet and communicate without wires.", 
    //     image: '/noteimg.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    // }, 
    {
        name: "Internet of Things",
        Subject_code: "CS801",
        Sem: "8",
        description: "It is about connects devices to the internet to improve monitoring and control.",
        image: '/Eng_IOT.png',  branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1gW_JyN7CYioi5g06xDwzZTQyCUXYZFmb/view'
    },
    // { 
    //     name: "Blockchain Technologies", 
    //     Subject_code: "CS802", 
    //     Sem: "8th", 
    //     description: "It teaches how to create secure systems for recording transactions and sharing data safely.", 
    //     image: '/noteimg.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    // }, 
    {
        name: "Cloud Computing",
        Subject_code: "CS802",
        Sem: "8",
        description: " It teaches how to store and access data and applications online.",
        image: '/Eng_CloudComputing.png',  branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1gW_JyN7CYioi5g06xDwzZTQyCUXYZFmb/view'
    },
    // { 
    //     name: "High Performance Computing", 
    //     Subject_code: "CS802", 
    //     Sem: "8th", 
    //     description: " It teaches how to use advanced computer systems to solve large-scale problems.", 
    //     image: '/noteimg.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    // }, 
    // { 
    //     name: "Object Oriented Software Engineering", 
    //     Subject_code: "CS802", 
    //     Sem: "8th", 
    //     description: " It teaches how to build software using objects and classes, focusing on good design and teamwork.", 
    //     image: '/noteimg.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    // }, 
    {
        name: "Game Theory with Engineering Applications",
        Subject_code: "CS803",
        Sem: "8",
        description: "It studies strategies for decision-making in competitive situations.",
        image: '/Eng_IPCV.png',  branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1gW_JyN7CYioi5g06xDwzZTQyCUXYZFmb/view'
    }
];

export default notesArray;
