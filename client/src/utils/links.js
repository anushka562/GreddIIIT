import { ImProfile } from 'react-icons/im';
import {BiBookmark} from 'react-icons/bi'
import {BiConversation} from 'react-icons/bi'
import {GoSearch} from 'react-icons/go'

const links = [
  {
    id: 1,
    text: 'SubGreddIIITs',
    path: '/',
    icon: <GoSearch/>,
  },
  {
    id: 2,
    text: 'my SubGreddIIITs',
    path: 'my-subGreddiiit',
    icon: <BiConversation/>,
  },
  {
    id: 3,
    text: 'saved posts',
    path: 'saved-posts',
    icon: <BiBookmark/>,
  },
  {
    id: 4,
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
];

export default links;