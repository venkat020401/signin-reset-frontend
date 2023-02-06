import { Link } from 'react-router-dom'

function Dashboard() {
    return (
        <>
            <div class="container-fluid">
                <div class="card shadow mb-4 mt-5">
                    <div class="card-header d-sm-flex align-items-center justify-content-between mb-4 ">
                        <h6 class="m-0 font-weight-bold text-dark"> You are successfully logged in</h6>
                        <Link to={"/"} class="d-none d-sm-inline-block btn btn-sm btn-dark shadow-sm float-center"><i
                            class="fas fa-download fa-sm text-white-50"></i> Logout</Link>
                    </div>
                </div>

            </div>
        </>

    )
}

export default Dashboard