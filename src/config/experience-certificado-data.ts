export interface ExperienceImage {
    url: string;
    caption?: string;
}
export interface ExperienceProject {
    title: string;
    description: string;
    repoUrl?: string;
    demoUrl?: string;
}
export interface ExperienceItem {
    slug?: string;
    type: "education" | "work" | "course";
    title: string;
    organization: string;
    period: string;
    shortDescription: string;
    fullDescription: string;
    certificateImage?: string;
    gallery?: ExperienceImage[];
    skills?: string[];
    projects?: ExperienceProject[];
    repoUrl?: string;
    certificateUrl?: string;
}
export const experienceData: ExperienceItem[] = [
    {
        slug: "tecnologia-analisis-desarrollo-software",
        type: "education",
        title: "Tecnólogo en Análisis y Desarrollo de Software",
        organization: "SENA",
        period: "2024 - 2026",
        shortDescription:
            "Formación integral en desarrollo de software, bases de datos, metodologías ágiles y buenas prácticas de programación.",
        fullDescription: `El programa de Tecnología en Análisis y Desarrollo de Software del SENA me proporcionó una formación completa y práctica en el desarrollo de aplicaciones.
Durante los dos años de formación, adquirí conocimientos sólidos en:
- Programación orientada a objetos
- Desarrollo web frontend y backend
- Bases de datos relacionales y NoSQL
- Metodologías ágiles (Scrum, Kanban)
- Control de versiones con Git
- Testing y aseguramiento de calidad
El programa incluyó múltiples proyectos prácticos que me permitieron aplicar los conocimientos teóricos en situaciones reales, preparándome para enfrentar los desafíos del mundo laboral.`,
        certificateImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
        skills: ["Java", "JavaScript", "PostgreSQL", "MySQL", "Git", "Scrum", "HTML/CSS"],
        projects: [
            {
                title: "Proyecto Académico de Software",
                description: "Aplicación desarrollada como parte del programa SENA aplicando arquitectura por capas, control de versiones con Git y metodologías ágiles.",
                repoUrl: "https://github.com/13camilaaaaa"
            }
        ],
        repoUrl: "https://github.com/13camilaaaaa",
    },
    {
        slug: "soporte-tecnico-fundamentos",
        type: "course",
        title: "Fundamentos de Soporte Técnico y Help Desk",
        organization: "Plataforma de Cursos",
        period: "2025",

        shortDescription:
            "Atención al usuario, diagnóstico de incidencias, mantenimiento de equipos y buenas prácticas en mesa de ayuda.",

        fullDescription: `Curso enfocado en las competencias clave del soporte técnico de primer y segundo nivel. Aprendí a abordar incidencias desde la atención al usuario hasta el cierre del ticket, garantizando trazabilidad y calidad del servicio.

Temas cubiertos:
- Fundamentos de Help Desk y atención al usuario
- Diagnóstico de hardware y software
- Mantenimiento preventivo y correctivo
- Redes básicas y resolución de conectividad
- Gestión de tickets e ITIL básico
- Buenas prácticas de comunicación con el usuario`,

        certificateImage: "/certificado_Next_js.jpg",
        skills: ["Help Desk", "Hardware", "Redes", "Mantenimiento", "ITIL", "Atención al Usuario"],
        projects: [],
        repoUrl: "",
        certificateUrl: ""
    },
    {
        slug: "automatizacion-pruebas",
        type: "course",
        title: "Automatización de Pruebas",
        organization: "Plataforma de Cursos",
        period: "2025",
        shortDescription:
            "Diseño e implementación de pruebas automatizadas para garantizar la calidad y estabilidad del software.",
        fullDescription: `Curso enfocado en la automatización del proceso de pruebas dentro del ciclo de vida del software, aplicando frameworks modernos y estrategias para optimizar la detección temprana de defectos.

Temas cubiertos:
- Fundamentos de automatización de pruebas
- Pruebas unitarias y de integración
- Pruebas End-to-End (E2E)
- Buenas prácticas y patrones de diseño en testing
- Integración con flujos de CI/CD
- Reporte de resultados y métricas de calidad`,
        certificateImage: "/certificado_React.jpg",
        skills: ["Automatización", "E2E Testing", "Unit Testing", "CI/CD", "QA"],
        projects: [],
        repoUrl: "",
        certificateUrl: ""
    },
    {
        slug: "javascript-moderno",
        type: "course",
        title: "JavaScript Moderno",
        organization: "Plataforma de Cursos",
        period: "2025",
        shortDescription:
            "Fundamentos avanzados de JavaScript ES6+, programación asíncrona y patrones de diseño.",
        fullDescription: `Este curso me proporcionó una base sólida en JavaScript moderno, cubriendo todas las características de ES6+ y las mejores prácticas de desarrollo.
Temas cubiertos:
- Variables y scope (let, const, var)
- Arrow functions y this
- Destructuring y spread operator
- Template literals
- Clases y herencia
- Módulos ES6
- Promesas y async/await
- Fetch API y manejo de APIs
- Manejo de errores
- Patrones de diseño (Module, Factory, Observer, etc.)
- Programación funcional
Cada tema incluyó ejercicios prácticos y proyectos que me permitieron aplicar los conceptos inmediatamente.`,
        certificateImage: "/javaScript.jpg",
        skills: ["JavaScript", "ES6+", "Async/Await", "Fetch API", "Patrones de Diseño"],
        projects: [
            {
                title: "Proverbios Gen", // Le agregué "Gen" para que suene a herramienta
                description: "Generador de citas aleatorias. Ejercicio básico de manipulación del DOM y manejo de arrays con JavaScript Vanilla.",
                repoUrl: "https://github.com/13camilaaaaa/AprendiendoJs/tree/main/Proyectos/Proverbios",
            },
            {
                title: "Vanilla JS CRUD",
                // "Persistencia de datos" y "Ciclo CRUD" son los términos técnicos correctos.
                description: "Implementación del ciclo de vida de datos (Crear, Leer, Actualizar, Eliminar). Práctica enfocada en la persistencia con LocalStorage y lógica de estado en el cliente.",
                repoUrl: "https://github.com/13camilaaaaa/AprendiendoJs/tree/main/NivelPro",
            },

        ],
        repoUrl: "https://github.com/13camilaaaaa/AprendiendoJs",
        certificateUrl: ""
    },
    {
        slug: "qa-testing-fundamentals",
        type: "course",
        title: "Software Testing & Quality Assurance",
        organization: "Plataforma de Cursos",
        period: "2025",
        shortDescription:
            "Dominio de metodologías de prueba (Manual/Automated), ciclo de vida del defecto y automatización con Cypress y Jest.",
        fullDescription: `Curso integral enfocado en garantizar la fiabilidad del software mediante estrategias de prueba modernas. Aprendí a diferenciar y aplicar distintos niveles de testing dentro del ciclo de desarrollo.

Temas cubiertos:
- Fundamentos de QA (Caja Negra vs Caja Blanca)
- Ciclo de vida del Bug y Reporte de incidencias
- Diseño y ejecución de Casos de Prueba (Test Cases)
- Pruebas Unitarias (Unit Testing) con Jest
- Pruebas de Integración
- Automatización End-to-End (E2E) con Cypress
- Introducción a TDD (Test Driven Development)
- Validación de selectores y aserciones en el DOM`,

        certificateImage: "/testing.jpg",

        skills: ["QA Manual", "Cypress", "Jest", "E2E Testing", "Test Cases", "Bug Tracking"],

        projects: [
            {
                title: "QA Case Study",
                description: "Documentación y diseño de matrices de prueba sobre flujos de un producto digital. Definición de casos de prueba, identificación de defectos y reporte estructurado de bugs.",
                repoUrl: "https://github.com/13camilaaaaa",
            },
        ],

        repoUrl: "https://github.com/13camilaaaaa",
        certificateUrl: ""
    },
];