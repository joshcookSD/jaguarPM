import React from 'react';

const TeamPageDetails = (props) => (
            <div>
                {
                    (props.team.owner.username === null)
                        ? <div> No Owner At This Time </div>
                        : <div> Owned By : {props.team.owner.username} </div>
                }
                {
                    props.team.projects.map((project, i) => {
                        return (
                            <div>
                                <ul>
                                    <li>{project.projecttitle}</li>
                                </ul>
                            </div>
                        )
                    })
                }

            </div>


    )


export default TeamPageDetails;