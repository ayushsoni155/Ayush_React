const notesArray = [ 
    { 
        name: "Engineering Chemistry", 
        Subject_code: "BT101", 
        Sem: "1", 
        description: "It focuses on the study of chemical principles and their applications in engineering.", 
        image: '/Eng_Chemistry.png', 
        branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1gtzsPu3rW3ThM_8ElTpteK9LCmAUR9O7/view?usp=drivesdk'
        
    }, 

    { 
        name: "Mathematics - I (M1)", 
        Subject_code: "BT102", 
        Sem: "1", 
        description: "It covers basic concepts of calculus, algebra, and geometry.", 
        image: '/Eng_M1.png', 
        branch: "CSE", 
        pdfUrl:'https://drive.google.com/file/d/1gvvq4i07dquvr6jl_xWVHjtjJ1KWqtkU/view?usp=drive_link'
    }, 
    { 
        name: "English for Communication", 
        Subject_code: "BT103", 
        Sem: "1", 
        description: "It focuses on improving language skills like speaking, writing, listening, and reading.", 
        image: '/Eng_EnglishForCommunication.png', 
        branch: "CSE", 
pdfUrl:'https://drive.google.com/file/d/1h0VAklYnZZEBvMwMAuC53KUtTCppQitL/view?usp=drivesdk' 
    }, 
    { 
        name: "Basic Electrical and Electronics Engineering", 
        Subject_code: "BT104", 
        Sem: "1", 
        description: "It covers fundamental concepts of electricity, circuits, electrical machines, and electronic devices.", 
        image: '/Eng_Beee.png', 
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1gsDzBnXYszu_70og29MNj_5BhL98o_2Y/view?usp=drivesdk' 
    }, 
    { 
        name: "Engineering Graphics", 
        Subject_code: "BT105", 
        Sem: "1", 
        description: " It teaches the basics of technical drawing, including projections, drafting, and visualization of objects.", 
        image: '/Eng_Ed.png',  
        branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1Krl8JMGfgyOW2TqAx3rAWbFyF7leWOpv/view?usp=drive_link' 
    }, 
    { 
        name: "Engineering Physics", 
        Subject_code: "BT201", 
        Sem: "2", 
        description: " It explores the fundamental principles of physics and their applications in engineering.", 
        image: '/Eng_Physics.png', 
         branch: "CSE", 
        pdfUrl:'https://drive.google.com/file/d/1WuAiPw9iZ3EMIPtQZTpOwPNZ1rWiIzmc/view?usp=drive_link' 
    }, 
    { 
        name: "Mathematics - II (M2)", 
        Subject_code: "BT202", 
        Sem: "2", 
        description: "It focuses on advanced calculus, differential equations, and vector analysis, essential for solving complex engineering problems.", 
        image: '/Eng_M2.png', 
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1ICvOmkRTF2QVTtl6RROXminywvjwtjdz/view?usp=drive_link' 
    }, 
    { 
        name: "Basic Mechanical Engineering", 
        Subject_code: "BT203", 
        Sem: "2", 
        description: "It introduces fundamental concepts of mechanics, thermodynamics, and material science.", 
        image: '/Eng_Mechanical.png', 
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1fJRn-qMttQjn7KzBisP0qkMObQ9jlRAL/view?usp=drive_link' 
    }, 
    { 
        name: "Basic Civil Engineering & Mechanics", 
        Subject_code: "BT204", 
        Sem: "2", 
        description: "It covers fundamental principles of civil engineering, including structures, materials, and mechanics.", 
        image: '/Eng_Civil.png', 
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1ZJugxts5P_OvLVJA-U29biO0Tq6azENA/view?usp=drive_link' 
    }, 
    { 
        name: "Basic Computer Engineering", 
        Subject_code: "BT205", 
        Sem: "2", 
        description: "It essential for understanding how computers and software work.", 
        image: '/Eng_BasicComputer.png', 
         branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1OgdeUxRQ5JvA5r9VTr86rCGykwszM-LD/view?usp=drive_link' 
    }, 
    { 
        name: "Energy & Environmental Engineering", 
        Subject_code: "ES301", 
        Sem: "3", 
        description: " It focuses on the study of energy systems, sustainability, and environmental protection.", 
        image: '/Eng_EEE.png', 
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1c7CGl57myM6dI2Uh-qdE2v2Vipxmhz1u/view?usp=drive_link' 
    }, 
    { 
        name: "Discrete Structure", 
        Subject_code: "CS302", 
        Sem: "3", 
        description: "It studies mathematical concepts related to countable, distinct objects, logic, set theory, graph theory, and combinatorics.", 
        image: '/Eng_Discret.png', 
         branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1sKrZhtWpbgP4j_hausheldTJcmpWJJyC/view?usp=drive_link' 
    }, 
    { 
        name: "Data Structure", 
        Subject_code: "CS303", 
        Sem: "3", 
        description: "It focuses on organizing and storing data efficiently.", 
        image: '/Eng_DSA.png', 
         branch: "CSE",
        pdfUrl:'https://drive.google.com/file/d/1kHWkWX0jgMoiLs0TN-4MGMQWQmbmao6K/view?usp=drive_link' 
    }, 
    { 
        name: "Digital Systems", 
        Subject_code: "CS304", 
        Sem: "3", 
        description: " It studies about logic gates, number systems, and digital signal processing.", 
        image: '/Eng_DigitalSystem.png', 
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1b7oIeH-wLaPp5yYnAzSuD1XEqsvXnhb5/view?usp=drive_link' 
    }, 
    { 
        name: "Object-Oriented Programming & Methodology", 
        Subject_code: "CS305", 
        Sem: "3", 
        description: "It emphasizing principles like encapsulation, inheritance, and polymorphism to create modular and reusable code.", 
        image: '/Eng_OOP.png', 
         branch: "CSE", 
    pdfUrl:'https://drive.google.com/file/d/1fQNYuyHFjpW_th-RRQrz7JwH4hgqUtWJ/view?usp=drivesdk' 
    }, 
    { 
        name: "Mathematics - III (M3)", 
        Subject_code: "CS401", 
        Sem: "4", 
        description: "It covers advanced topics such as linear algebra, complex variables, and partial differential equations.", 
        image: '/Eng_M3.png',
	branch: "CSE",
    pdfUrl:'https://drive.google.com/file/d/1VL4ndNsNylp4RXSXhX8YYl6CeJ45zJCi/view?usp=drive_link' 
    }, 
    { 
        name: "Analysis and Design of Algorithms", 
        Subject_code: "CS402", 
        Sem: "4", 
        description: "It teaches how to evaluate the performance of algorithms and create efficient solutions to problems.", 
        image: '/Eng_ADA.png', 
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1g__HS7UFjIyNXhMpOKNAVDXoIXl0_g3R/view?usp=drive_link'
    }, 
    { 
        name: "Software Engineering", 
        Subject_code: "CS403", 
        Sem: "4", 
        description: " It focuses on the systematic design, development, testing, and maintenance of software.", 
        image: '/Eng_SE.png', 
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1ECE5lkA00msxqejUX7VsQyyy0Q2fpqI6/view?usp=drive_link' 
    }, 
    { 
        name: "Computer Organization & Architecture", 
        Subject_code: "CS404", 
        Sem: "4", 
        description: "It explains how computers are built and how they work, processor, memory, and data handling.", 
        image: '/Eng_COA.png', 
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1D5nxk9bIckzU7aLDunIjWJ6x9lXa2Du7/view?usp=drive_link' 
    }, 
    { 
        name: "Operating System", 
        Subject_code: "CS405", 
        Sem: "4", 
        description: "It explains how a computer works by managing hardware, running programs, and handling tasks like memory and storage.", 
        image: '/Eng_OS.png', 
         branch: "CSE",
         pdfUrl:'https://drive.google.com/file/d/1X6DIdCKEC8eEwkS6q7tFt5ly7i0RKLkT/view?usp=drive_link' 
    }, 
    { 
        name: "Theory of Computation", 
        Subject_code: "CS501", 
        Sem: "5", 
        description: " It studies how computers solve problems.", 
        image: '/Eng_TOC.png',
         branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    }, 
    { 
        name: "Database Management Systems", 
        Subject_code: "CS502", 
        Sem: "5", 
        description: " (DBMS) store, organize, and manage data, allowing users to easily retrieve, update, and manipulate information.", 
        image: '/Eng_DBMS.png',
         branch: "CSE", 
pdfUrl:'https://drive.google.com/file/d/1fg_FfyPUcm3hGum-tnucnRPX7kX0jRuG/view?usp=drivesdk' 
    }, 
    { 
        name: "Data Analytics", 
        Subject_code: "CS503", 
        Sem: "5", 
        description: "It involves analyzing data to find patterns, make decisions, and solve problems using techniques.", 
        image: '/Eng_DataAnalytics.png',
         branch: "CSE",
         pdfUrl:'/https://drive.google.com/file/d/1c3xe7shW-6qTnYapXQd9mKI4iCn4HAkI/view?usp=drive_link' 
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
         branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    }, 
    { 
        name: "Machine Learning", 
        Subject_code: "CS601", 
        Sem: "6", 
        description: "It teaches computers to learn from data and improve their performance on tasks.", 
        image: '/Eng_ML.png',
         branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    }, 
    { 
        name: "Computer Network", 
        Subject_code: "CS602", 
        Sem: "6", 
        description: "It focus on how computers connect and communicate with each other to share data and resources.", 
        image: '/Eng_ComputerNetwork.png',
         branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
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
        image: '/Eng_CompilerDesign.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    }, 
    { 
        name: "Knowledge Management", 
        Subject_code: "CS604", 
        Sem: "6", 
        description: " It is about gathering, organizing, and sharing information.", 
        image: '/Eng_KnowledgeManagment.png',
         branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    }, 
    { 
        name: "Software Architectures", 
        Subject_code: "CS701", 
        Sem: "7", 
        description: " It defining how different parts work together to meet requirements and design goals.", 
        image: '/Eng_SoftwareArchitecture.jpg',
         branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    },
{ 
        name: "Big Data", 
        Subject_code: "CS702", 
        Sem: "7", 
        description: " It refers to large and complex data sets that require special tools to store, analyze, and manage the data sets.", 
        image: '/Eng_BigData.png',
         branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
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
        image: '/Eng_IOT.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
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
        image: '/Eng_CloudComputing.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
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
        image: '/Eng_IPCV.png', branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    } 
]; 
 
export default notesArray;
