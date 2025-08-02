import { TiHome } from "react-icons/ti";
import { FaListCheck } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { RiTodoFill } from "react-icons/ri";
const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: <TiHome className="size-5" />,
    link: "/",
  },
  {
    id: 2,
    title: "Important!",
    icon: <FaListCheck className="size-5" />,
    link: "/important",
  },
  {
    id: 3,
    title: "Completed!",
    icon: <FaCheck className="size-5" />,
    link: "/completed",
  },
  {
    id: 4,
    title: "Do It Now",
    icon: <RiTodoFill className="size-5" />,
    link: "/incomplete",
  },
];

export default menu;