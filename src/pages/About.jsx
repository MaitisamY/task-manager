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
                            Hey there! I'm Muhammad Aitisam Yaseen the developer of this project.
                        </li>
                        <li>
                            As a developer, I'm always looking for new and exciting projects to work on.
                        </li>
                        <li>
                            My tech stack is MERN & PERN stack and Next.js. 
                        </li>
                        <li>
                            My new learning path is Full Stack Web Development. That involves DevOps.
                        </li>
                        <li>
                            See my other projects on: 
                            <a 
                                className="outer-link"
                                href="https://github.com/MaitisamY" 
                                target="_blank" 
                                rel="noreferrer nofollow noopener"
                            >Github</a>
                        </li>
                    </ul>    
                </div>
            </div>
        </>
    )
}

export default About