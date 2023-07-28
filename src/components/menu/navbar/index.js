import { useDispatch, useSelector } from "react-redux"
import { useNavigate  } from "react-router-dom"
import { logout } from "../../../store/slices/auth/slices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

export default function Navbar () {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userAvatar = <FontAwesomeIcon icon={faUser} />
	const { username } = useSelector(state => {
        return {
			username : state.auth.username
        }
    })
	const id = localStorage.getItem("id")
	const onButtonLogout = () => {
		navigate("/login")
        dispatch(logout()) 
    }

	return (
		<nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
			<div class="flex flex-wrap items-center justify-between mx-auto p-4 pr-[250px]">
				<a onClick={() =>{navigate("/")}} className="flex items-center normal-case text-[25pt] ">
					Toko Hidup Makmur
				</a>
				<div class=" w-full md:block md:w-auto" id="navbar-dropdown">
				<ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
					<li>
						<a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">
							Home
						</a>
					</li>
					
					<li>
					<a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
						Services
					</a>
					</li>
				</ul>
				</div>
			</div>
		</nav>
	)
}
