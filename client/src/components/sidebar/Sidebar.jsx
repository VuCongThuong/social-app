import './sidebar.css'
import {RssFeed} from '@mui/icons-material'
export default function Sidebar() {
  return (
    <div className='sidebar'>Sidebar
      <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
                <RssFeed className='sidebarIcon' />
                <span className="sidebarListItemText">Feed</span>
            </li>
            <li className="sidebarListItem">
                <RssFeed className='sidebarIcon' />
                <span className="sidebarListItemText">Chats</span>
            </li>
            <li className="sidebarListItem">
                <RssFeed className='sidebarIcon' />
                <span className="sidebarListItemText">Videos</span>
            </li>
            <li className="sidebarListItem">
                <RssFeed className='sidebarIcon' />
                <span className="sidebarListItemText">Groups</span>
            </li>
            <li className="sidebarListItem">
                <RssFeed className='sidebarIcon' />
                <span className="sidebarListItemText">Bookmarks</span>
            </li>
            <li className="sidebarListItem">
                <RssFeed className='sidebarIcon' />
                <span className="sidebarListItemText">Questions</span>
            </li>
            <li className="sidebarListItem">
                <RssFeed className='sidebarIcon' />
                <span className="sidebarListItemText">Jobs</span>
            </li>
            <li className="sidebarListItem">
                <RssFeed className='sidebarIcon' />
                <span className="sidebarListItemText">Events</span>
            </li>
            <li className="sidebarListItem">
                <RssFeed className='sidebarIcon' />
                <span className="sidebarListItemText">Courses</span>
            </li>
          </ul>
          <button className='sidebarButton'>Show More</button>
          <hr className="sidebarHr" />
          <ul className="sidebarFriendList">
            <li className='sidebarFriend'>
              <img src="/assets/person/2.jpeg" alt="" className="sidebarFriendImg" />
              <span className="sidebarFriendName">Thuong</span>
            </li>
            <li className='sidebarFriend'>
              <img src="/assets/person/2.jpeg" alt="" className="sidebarFriendImg" />
              <span className="sidebarFriendName">Thuong</span>
            </li>
            <li className='sidebarFriend'>
              <img src="/assets/person/2.jpeg" alt="" className="sidebarFriendImg" />
              <span className="sidebarFriendName">Thuong</span>
            </li>
            <li className='sidebarFriend'>
              <img src="/assets/person/2.jpeg" alt="" className="sidebarFriendImg" />
              <span className="sidebarFriendName">Thuong</span>
            </li>
            <li className='sidebarFriend'>
              <img src="/assets/person/2.jpeg" alt="" className="sidebarFriendImg" />
              <span className="sidebarFriendName">Thuong</span>
            </li>
            <li className='sidebarFriend'>
              <img src="/assets/person/2.jpeg" alt="" className="sidebarFriendImg" />
              <span className="sidebarFriendName">Thuong</span>
            </li>
          </ul>
      </div>
    </div>
  )
}
