import { AiOutlineSearch } from "react-icons/ai";
import { MdPersonAddAlt } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

import "./SearchComponentStyle.scss";
const SearchComponent = () => {
  return (
    <form className="form_search">
      <div className="group_input">
        <span>
          <AiOutlineSearch />
        </span>
        <input placeholder="Tìm kiếm" type="text" />
      </div>

      <span className="icon">
        <MdPersonAddAlt />
      </span>
      <span className="icon">
        <BsPeople />
      </span>
    </form>
  );
};

export default SearchComponent;
