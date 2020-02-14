import React from 'react';
import './ManageEvents.css';

function ManageEvents() {
  return (
    <div className="postEvent">
      <form>
        <div>
          <label>Name</label>
          <input type="text" placeholder="Enter name of event" required />
        </div>

        <div>
          <label>Date</label>
          <input type="date" placeholder="Enter a date" />
        </div>
        <div>
          <label>Time</label>
          <input type="time" required />
        </div>
        <div>
          <label for="timezone" name="timezone">
            Timezone
          </label>
          <select id="timezone">
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
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input type="number" />
        </div>
        <div>
          <label>Image Url</label>
          <input />
        </div>
        <div>
          <label id="category" name="category">
            Category
          </label>
          <select id="category">
            <option value="" disabled selected>
              Choose One
            </option>
            <option value="sports">Sports</option>
            <option value="music">Music</option>
            <option value="festival">Festival</option>
            <option value="miscellaneous">Misc.</option>
            <option value="activism">Activism</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default ManageEvents;
