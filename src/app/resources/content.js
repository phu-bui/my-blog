import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Phu',
    lastName: 'Bui',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role: 'Software Engineer',
    avatar: '/images/avatar.jpg',
    location: 'Asia/Tokyo',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['English', 'Japanese', 'Vietnamese'],  // optional: Leave the array empty if you don't want to display languages
    mail: 'hunter17599@gmail.com',
}

const newsletter = {
    display: true,
    title: <>Subscribe to {person.firstName}'s Newsletter</>,
    description: <>I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.</>
}

const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/phu-bui',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/phu-bui-40a973232/',
    },
    {
        name: 'X',
        icon: 'x',
        link: '',
    },
    {
        name: 'Email',
        icon: 'email',
        link: `mailto:${person.mail}`,
    },
]

const home = {
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <>Software engineer</>,
    subline: <>I'm Phu Bui, a software engineer at <InlineCode>Shirokuma Power</InlineCode>, where I craft intuitive user experiences. After hours, I build my own projects.</>
}

const about = {
    label: 'About',
    title: 'About me',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: false
    },
    avatar: {
        display: true
    },
    calendar: {
        display: true,
        link: `https://calendar.google.com/calendar/u/0/r/eventedit?text=Meet+with+Me&details=Let%27s+have+a+video+call.&add=${person.mail}`
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: <>I am a software engineer in Japan with a passion for turning complex challenges into simple, convenient software solutions. My work includes user requirement analysis, system design, and software development implementation.</>
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Work Experience',
        experiences: [
            {
                company: 'Shirokuma Power',
                timeframe: '2022 - Present',
                role: 'Middle Software Engineer',
                achievements: [
                    <>Developed a solar power plant monitoring system that supports monitoring of thousands of power plants across Japan.</>,
                    <>Developed a battery station monitoring system and remote battery station control support system.</>
                ],
                images: [ // optional: leave the array empty if you don't want to display images
                    // {
                    //     src: '/images/projects/project-01/cover-01.jpg',
                    //     alt: 'Once UI Project',
                    //     width: 16,
                    //     height: 9
                    // }
                ]
            },
            {
                company: 'Miichisoft',
                timeframe: '2022',
                role: 'Software Engineer',
                achievements: [
                    <>Developed a design system that unified the brand across multiple platforms, improving design consistency by 40%.</>,
                    <>Led a cross-functional team to launch a new product line, contributing to a 15% increase in overall company revenue.</>
                ],
                images: []
            }
        ]
    },
    credentials: {
        display: true,
        title: 'Credentials',
        items: [
            {
                title: 'AWS Certified Solutions Architect – Professional',
                description: <>https://www.credly.com/badges/51471704-9c53-47f4-a735-369baef66bbe/public_url</>,
                date: 'April 04, 2025',
                images: [
                    {
                        src: '/images/credentials/aws-certified-solutions-architect-professional.png',
                        alt: 'AWS certified solutions architect professional image',
                        width: 9,
                        height: 9
                    },
                ]
            },
            {
                title: 'AWS Certified Solutions Architect – Associate',
                description: <>https://www.credly.com/badges/0687f159-928a-4d07-b21f-f7d1e9bce68c/public_url</>,
                date: 'May 02, 2024',
                images: [
                    {
                        src: '/images/credentials/aws-certified-solutions-architect-associate.png',
                        alt: 'AWS certified solutions architect associate image',
                        width: 9,
                        height: 9
                    },
                ]
            },
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Studies',
        institutions: [
            {
                name: 'HaNoi University of science and technology',
                description: <>Studied software engineering.</>,
            },
        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Technical skills',
        skills: [
            {
                title: 'AI, Machine Learning, Deep Learning, Gen AI, AI Agent, ...',
                description: <>I have hands-on experience working on various Deep Learning projects, including computer vision applications such as traffic sign recognition, pneumonia detection from chest X-ray images, and violence detection in school environments using surveillance cameras. In addition to my background in traditional AI, I have also been actively involved in developing projects related to Generative AI, particularly focusing on Retrieval-Augmented Generation (RAG) models. These projects have allowed me to integrate large language models with external knowledge sources to build more accurate and context-aware AI systems.</>,
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: '/images/projects/pneumonia-detection/cnn_pneumonia.png',
                        alt: 'CNN pneumonia image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/rag-system/qdrant_ollama.png',
                        alt: 'Rag image',
                        width: 16,
                        height: 9
                    },
                ]
            },
            {
                title: 'Python, TypeScript/JavaScript, PHP, Go, ...',
                description: <>Used almost all programming languages ​​for software development.</>,
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: '/images/projects/project-01/programming.jpg',
                        alt: 'Program language image',
                        width: 16,
                        height: 9
                    },
                ]
            },
            {
                title: 'Docker, Kubernetes',
                description: <>Highly experienced professional with in-depth expertise in Docker and Kubernetes, including containerization, orchestration, cluster management, and optimizing deployment pipelines for scalable and reliable applications.</>,
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: '/images/projects/project-01/docker.jpg',
                        alt: 'Docker image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/kubernet.jpg',
                        alt: 'Kubernet image',
                        width: 16,
                        height: 9
                    },
                ]
            },
            {
                title: 'AWS',
                description: <>I possess extensive experience and skills closely aligned with those of an AWS Solutions Architect Professional, including designing scalable, secure, and cost-efficient cloud architectures. I also have hands-on experience in automating infrastructure deployment using AWS CloudFormation, ensuring consistency, repeatability, and ease of management across environments.</>,
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: '/images/projects/project-01/aws.jpg',
                        alt: 'Aws image',
                        width: 16,
                        height: 9
                    },
                ]
            },
            {
                title: 'React, Next.js, ...',
                description: <>Building multiple apps with Next.js. I am a senior developer with extensive expertise in building scalable and high-performance applications using Next.js. In addition, I also have experience developing smartphone applications using React Native, enabling cross-platform mobile solutions with seamless user experiences.</>,
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: '/images/projects/project-01/nextjs.jpg',
                        alt: 'Nextjs image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/react_native.png',
                        alt: 'React native image',
                        width: 16,
                        height: 9
                    },
                ]
            },
            {
                title: 'Figma',
                description: <>I have strong skills in using Figma to create intuitive and visually appealing designs.</>,
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: '/images/projects/project-01/figma.jpg',
                        alt: 'Figma image',
                        width: 16,
                        height: 9
                    },
                ]
            },
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'Writing about Gen AI techniques and system design...',
    description: `Read what ${person.name} has been up to recently`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Work',
    title: 'My projects',
    description: `Design and dev projects by ${person.name}`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}

const gallery = {
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection by ${person.name}`,
    // Images from https://pexels.com
    images: [
        {
            src: '/images/gallery/img-01.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-02.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-03.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-04.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-05.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-06.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-07.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-08.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-09.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-10.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-11.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-12.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-13.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-14.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
    ]
}

export { person, social, newsletter, home, about, blog, work, gallery };
