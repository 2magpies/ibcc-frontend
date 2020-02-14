import React from 'react';
import './ManageEvents.css';
import Axios from 'axios';

function ManageEvents() {
  // const [newNameValue, setNewName] = useState([]);
  // const [newDateValue, setNewDate] = useState([]);
  // const [newTimeValue, setNewTime] = useState([]);
  // const [newTimezoneValue, setNewTimezone] = useState([]);
  // const [newDescriptionValue, setNewDescription] = useState([]);
  // const [newPriceValue, setNewPrice] = useState([]);
  // const [newUrlValue, setNewUrl] = useState([]);
  // const [newCategoryValue, setNewCategory] = useState([]);

  const postNewEvent = data => {
    const url = 'http://localhost:3001/events';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    let data = {};
    data.name = event.target['name'].value;
    data.date = event.target['date'].value;
    data.time = event.target['time'].value;
    data.timezone = event.target['timezone'].value;
    data.description = event.target['description'].value;
    data.price = event.target['price'].value;
    data.imageUrl = event.target['imageUrl'].value;
    data.category = event.target['category'].value;

    postNewEvent(data);
  };

  return (
    <div className="postEvent">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name of event"
            name="name"
            required
          />
        </div>

        <div>
          <label>Date</label>
          <input type="date" placeholder="Enter a date" name="date" required />
        </div>
        <div>
          <label>Time</label>
          <input type="time" name="time" required />
        </div>
        <div>
          <label name="timezone">Timezone</label>
          <select id="timezone" required>
            <option value="pst">PST</option>
            <option value="cst">CST</option>
            <option value="est">EST</option>
            <option value="mst">MST</option>
            <option value="hst">HST</option>
            <option value="akst">AKST</option>
          </select>
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter description of event"
            name="description"
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input type="number" name="price" required />
        </div>
        <div>
          <label>Image Url</label>
          <input type="text" name="imageUrl" required />
        </div>
        <div>
          <label id="category" name="category">
            Category
          </label>
          <select id="category" required>
            <option value="" disabled defaultValue>
              Choose One
            </option>
            <option value="sports">Sports</option>
            <option value="music">Music</option>
            <option value="festival">Festival</option>
            <option value="miscellaneous">Misc.</option>
            <option value="activism">Activism</option>
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ManageEvents;