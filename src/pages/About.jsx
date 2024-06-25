import windowWidthDetection from '../util/WindowWidthDetection'

const About = () => {

    const windowWidth = windowWidthDetection()

    return (
        <>
            <h1 className="page-heading">About</h1>
            <div 
                className="task-container" 
                style={{ width: windowWidth <= 768 ? '86%' : '97%', minWidth: '90%' }}
            >
                <div className="content">
                    <h5>The developer</h5>
                    <ul>
                        <li>
                            Hey there! I'm Muhammad Aitisam Yaseen the developer of this application.
                        </li>
                        <li>
                            As a developer, I'm always looking for new and exciting applications to work on.
                        </li>
                        <li>
                            My tech stack is MERN & PERN stack and Next.js. 
                        </li>
                        <li>
                            My new learning path is Full Stack Web Development and currently focusing on DevOps.
                        </li>
                        <li>
                            See my other projects and applications on: 
                            <a 
                                className="outer-link"
                                href="https://github.com/MaitisamY" 
                                target="_blank" 
                                rel="noreferrer nofollow noopener"
                            >Github</a>
                        </li>
                    </ul>  

                    <h5>This application</h5>  
                    <ul>
                        <li>
                            <strong>This application is purely front-end (Vite + React), No backend and database is integrated.</strong>
                        </li>
                        <li>
                            The application is called Task Manager. Its purpose is to help you manage your tasks, and keep track of your progress.
                        </li>
                        <li>
                            A new kind of thing called thread is added to the application. You can create threads and add tasks into them.
                        </li>
                        <li>
                            I leveraged localstorage to keep track of tasks. And to apply CRUD operations smoothly across the application.
                        </li>
                        <li>
                            Web workers are used to improve performance and reduce latency. 
                            Service workers are used to make sure that the application installs and runs smoothly offline too.
                        </li>
                        <li>
                            This application is open sourced on: 
                            <a 
                                className="outer-link" 
                                href="https://github.com/MaitisamY/task-manager" 
                                target="_blank" 
                                rel="noreferrer nofollow noopener"
                            >
                                Github
                            </a>
                        </li>
                        <li>
                            This application is hosted on: 
                            <a 
                                className="outer-link" 
                                href="https://task-manager-blond-seven.vercel.app/" 
                                target="_blank" 
                                rel="noreferrer nofollow noopener"
                            >
                                Vercel
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default About