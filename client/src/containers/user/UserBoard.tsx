import { useState } from 'react'
import Students from '../students/Students'
import Courses from '../courses/Courses'

type ComponentType = "students" | "courses";

// UserBoard

const UserBoard = () => {
    const [view, setView] = useState<ComponentType | null>(null);

    const handleView = (component: ComponentType) => {
        setView(component)
    }

    return (
        <>
            <div className="flex flex-col min-h-screen pt-[4rem]">
                <div className='flex-grow px-5 mx-auto max-w-screen-xl w-full py-8'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-center justify-center align-middle">
                        <div className={`bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-1000 border border-neutral-500 p-4 rounded-md shadow-white/50 shadow-sm hover:bg-neutral-700 cursor-pointer 
                    ${view === 'students' ? 'bg-neutral-700 border-0' : ''}`}
                            onClick={() => handleView("students")}>
                            <h2 className="text-xl font-medium text-white cursor-pointer">Students</h2>
                        </div>
                        <div className={`bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-1000 border border-neutral-500 p-4 rounded-md shadow-white/50 shadow-sm hover:bg-neutral-700 cursor-pointer 
                    ${view === 'courses' ? 'bg-neutral-700 border-0' : ''}`}
                            onClick={() => handleView("courses")}>
                            <h2 className="text-xl font-medium text-white cursor-pointer">Courses</h2>
                        </div>
                    </div>
                    {view === "students" && <Students />}
                    {view === "courses" && <Courses />}
                </div>
            </div>
        </>
    )
}

export default UserBoard
