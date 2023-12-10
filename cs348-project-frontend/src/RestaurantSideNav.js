import SideNav, {NavItem, NavIcon, NavText,Toggle} from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import {useNavigate} from 'react-router-dom'

function RestaurantSideNav(){
    const navigate = useNavigate();
    return <SideNav
        onSelect={selected=> {console.log(selected)
            navigate('/'+ selected)
        }}
        className="restaurant-side-nav"

    >
            <SideNav.Toggle/>
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
                <NavIcon><i className='fa fa-fw fa-home' style={{fontSize: "1.5em"}}></i></NavIcon>
                <NavText>Home</NavText>
            </NavItem>
            <NavItem eventKey="restaurant">
                <NavIcon><i className="fa-solid fa-utensils" style={{fontSize: "1.5em"}}></i></NavIcon>
                <NavText>Restaurant</NavText>
                <NavItem eventKey="restaurant-create">
                    <NavText>Create Restaurant</NavText>
                </NavItem>
                <NavItem eventKey="restaurant-get">
                    <NavText>Get Restaurant</NavText>
                </NavItem>
                <NavItem eventKey="restaurant-update">
                    <NavText>Update Restaurant</NavText>
                </NavItem>
                <NavItem eventKey="restaurant-delete">
                    <NavText>Delete Restaurant</NavText>
                </NavItem>
                <NavItem eventKey="restaurant-search2">
                    <NavText>Search Restaurants (by zipcode and cuisine)</NavText>
                </NavItem>                
            </NavItem>
            <NavItem eventKey="user">
                <NavIcon><i className="fa-regular fa-user" style={{fontSize: "1.5em"}}></i></NavIcon>
                <NavText>User</NavText>
                <NavItem eventKey = "user-create">
                    <NavText>Create User</NavText>
                </NavItem>
                <NavItem eventKey = "user-get">
                    <NavText>Get User</NavText>
                </NavItem>
                <NavItem eventKey = "user-delete">
                    <NavText>Delete User</NavText>
                </NavItem>
            </NavItem>
            <NavItem>
                <NavIcon><i className="fa-regular fa-comment" style={{fontSize: "1.5em"}}></i></NavIcon>
                <NavText>Reviews</NavText>
                <NavItem eventKey = "review-create">
                    <NavText>Create Review</NavText>
                </NavItem>
                <NavItem eventKey = "review-search">
                    <NavText>Search Review</NavText>
                </NavItem>
            </NavItem>
        </SideNav.Nav>
    </SideNav>

}

export default RestaurantSideNav;