export interface Bullet {
    text: string;
    link?: string;
  }
  
  export interface Experience {
    title: string;
    location: string;
    bullets: Bullet[];
    align: "left" | "right";
  }
  
  export const experiences: Experience[] = [
    {
      title: "Easley-Dunn Productions, Inc. – Software Engineer",
      location: "Los Angeles, CA | Feb 2025 – Present",
      bullets: [
        { text: "Implemented backend systems and gameplay in Unity, integrating APIs and ensuring reliability across distributed components." },
        { text: "Led feature development and performance optimization, debugging critical issues to improve scalability of production systems." },
        { text: "Optimized memory usage and frame rates, ensuring a smoother user experience." },
      ],
      align: "left",
    },
    {
      title: "RiskSpan – AI Engineer Intern",
      location: "Arlington, VA | Oct 2024 – Dec 2024",
      bullets: [
        { text: "Built Generative AI models (GANs, VAEs) to create synthetic financial datasets, improving data diversity and model accuracy." },
        { text: "Optimized models via hyperparameter tuning, feature selection, and bias mitigation, improving predictive accuracy." },
        { text: "Developed ETL pipelines for preprocessing and validating financial datasets." },
      ],
      align: "right",
    },
    {
      title: "Reliance Jio – Software Development Engineer",
      location: "Mumbai, India | Aug 2021 – May 2023",
      bullets: [
        { text: "Performed thorough testing on mobile and web applications, collaborating with developers to improve usability." },
        { text: "Supported backend development of an internal data analytics tool." },
      ],
      align: "left",
    },
    {
      title: "IMT Atlantique – AI Research Intern",
      location: "Nantes, France | Jun 2020 – Jul 2020",
      bullets: [
        { text: "Developed RNN and LSTM-based prediction models for solar energy power production, reducing errors by 50%." },
        { text: "Find my work here", link: "https://github.com/pearlpatel207/Estimation-of-Electricity-Production-from-Photovoltaic-Panels" },
      ],
      align: "right",
    },
    {
      title: "Blockchain & AI Lab, VJTI Mumbai – Research Intern",
      location: "Mumbai, India | Nov 2019 – May 2020",
      bullets: [
        { text: "Engineered Deepfake detection models using CNN-based architectures, improving accuracy." },
        { text: "Built efficient video data pipelines for high-dimensional inputs, improving detection performance." },
      ],
      align: "left",
    },
  ];
  