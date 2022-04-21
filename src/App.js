import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./styles.scss";

function App() {
  return (
    <nav>
      <h3 className="padding">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/contactus">Contact Us</Link>
      </h3>
      <Routes>
        <Route path="/" element={<SearchFields />} />
        <Route path="/search" element={<GetSearch />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </nav>
  );
}

//Search for Author's Work
function GetSearch() {
  const [result, setResult] = useState([]);
  const [counter, setCounter] = useState(1);
  const [titleChange, setTitleChange] = useState({});
  const [total, setTotal] = useState([]);

  //fetch
  var getPage = (reset) => {
    var url =
      "https://api.itbook.store/1.0/search/" + titleChange + "/" + counter;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResult(data.books);
        setTotal(data.total);
        if (reset) {
          setCounter(1);
        }
      })
      .catch((err) => console.log(err));
  };

  //event handlers
  var searchBook = () => {
    getPage(true);
  };

  var newTitle = (event) => {
    setTitleChange(event.target.value);
  };

  var subCount = (event) => {
    setCounter(counter - 1);
  };

  var addCount = (event) => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    var url =
      "https://api.itbook.store/1.0/search/" + titleChange + "/" + counter;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResult(data.books);
      })
      .catch((err) => console.log(err));
  }, [counter, titleChange]);

  //display
  return (
    <div className="searching flex-container">
      <form>
        <label>
          Enter Book Title:
          <input type="text" id="newTitle" onChange={newTitle} /> <br />
          <button className="searchTitle" type="submit" onClick={searchBook}>
            Search Title
          </button>
        </label>
        <br />
        <br />
        <br />
      </form>
      <div>
        {result.map((info) => (
          <Book cover={info.image} title={info.title} author={info.subtitle} />
        ))}
        {counter > 1 ? (
          <button value={counter} onClick={subCount}>
            Prev. Page
          </button>
        ) : (
          ""
        )}
        {counter <= total ? (
          <button value={counter} onClick={addCount}>
            Next Page
          </button>
        ) : (
          ""
        )}
        {counter} / {total}
      </div>
    </div>
  );
}

const Book = (props) => (
  <div className="bookDisplay">
    <img src={props.cover} alt="book_cover.jpg" /> <br />
    <span>{props.title}</span>
    <br />
    <span>{props.author}</span>
    <br />
  </div>
);

//Main Page
function SearchFields() {
  return (
    <div>
      <Link to="/search">
        <img
          src="https://www.millcitypress.net/wp-content/uploads/2018/08/author-bios.jpg"
          alt="get_author.jpg"
        />
      </Link>
    </div>
  );
}

//Error, Link not found
function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
}

function ContactUs() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState(
    "You can type your answer in here :-)"
  );

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`
    first name: ${firstName}
     last name: ${lastName}
     email: ${email}
     feedback: ${feedback}
     `);
  };

  return (
    <form className="flex-container" onSubmit={handleSubmit}>
      <label>
        Enter your first name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Enter your last name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Enter your email address:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        What did you think of our web app?
        <br />
        <textarea value={feedback} onChange={handleChange} />
      </label>
      <br />
      <input type="submit" value="SUBMIT" />
    </form>
  );
}

export default App;
