import { filter, inbox, today, upcoming } from "../assets";
import { v4 as uuidv4} from "uuid";

export const SideBarItems = [
  {
    id: uuidv4(),
    path: "/home/inbox",
    icon: inbox,
    content: "Inbox"
  },
  {
    id: uuidv4(),
    path: "/home/today",
    icon: today,
    content: "Today"
  },
  {
    id: uuidv4(),
    path: "/home/upcoming",
    icon: upcoming,
    content: "Upcoming"
  },
  {
    id: uuidv4(),
    path: "/home/filter-labels",
    icon: filter,
    content: "Filters & Labels"
  },
];
