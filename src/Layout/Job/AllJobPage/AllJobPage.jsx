import React from 'react'
import { PathTree } from 'Components/Path'
import { JobSearch, JobNew, JobInteresting } from 'Components/Job'

function AllJobPage() {

    return (
        <div>
            <div className="JobPage__header jh-container">
                <PathTree />
                <JobSearch />
                <JobNew />
                <JobInteresting />
            </div>
        </div>
    )
}

export default AllJobPage