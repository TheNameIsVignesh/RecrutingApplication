import { useState, useEffect } from 'react'
import './App.css';
import './index.css';
import JsonData from './data.json'
import {jsonData} from './mock'
import Header from './header'
import SectionHeader from './sectionHeader'

function App() {
  const [data, setData] = useState([])
  const [showDropdown, setShowDropDown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const fetchData = async (index) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const result = await response.json()
      setData(result)
      setSelectedButton(index);
      setShowDropDown(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDropdownChange = (event) => {
    const selectedItemId = event.target.value;
    setSelectedOption(selectedItemId);
  };

  const renderCards = ()=> {
    return <>
    {
      jsonData && jsonData.map((info,index) => {
        return (
          <div className='card-details'>
            <div className='card-details-one'>
            <div>
              <h3 className='name-text'>{info.name}</h3>
              <h4 className='space-valuse'>{info.text}</h4>
              <p className=''>{info.description}</p>
            </div>
            <div className='progress-container'>
              <div className='progress'>100%</div>
            </div>
            <div className='cardabc'>
              <p>{info.date}<span>{info.time}</span></p>
              {
                info.groupInfo ? <p>{info.groupInfo}</p> : null
              }
              <p className='location'>{info.location}</p>
              <div className='button-container'>
                {
                  info.viewMeeting ? <button className='card-button' >{info.viewMeeting}</button> : null
                }
                {
                  !showDropdown ? <button className='card-button' onClick={()=>fetchData(index)}>{info.buttonText}</button> :
                  selectedButton === index ? <select onChange={handleDropdownChange}>
                      {
                        data.slice(0, 3).map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title}
                          </option>
                        ))
                      }
                    </select> : <button className='card-button' onClick={()=>fetchData(index)}>{info.buttonText}</button>
                }

              </div>
            </div>
            </div>
            <div>
            {selectedOption &&  selectedButton === index && (
            <div className="additional-info">
              <p className='info-container'><p className='info-title'>Client Confidence:</p> {JsonData.meeting_summary}</p>
              <p className='info-container'><p className='info-title'>Sales Team Confidence: </p>{JsonData.sales_team_confidence}</p>
              <p className='info-container'><p className='info-title'>Sales Team Confidence result reason:</p> {JsonData.sales_team_confidence_result_reason}</p>
              <p className='info-container'><p className='info-title'>Meeting Summary: </p>{JsonData.meeting_summary}</p>
              <p className='info-container'><p className='info-title'>Next step after this meeting:</p> {JsonData.next_step_after_this_meeting}</p>
              <p className='info-container'><p className='info-title'>any strange string from client: </p>{JsonData.any_strange_thing_from_client}</p>
            </div>
          )}
          </div>
          </div>

        )
      })
    }
    </>
  }
  return (
    <div className="App">
      <Header />
      <div>
        <SectionHeader />
          {renderCards()}
      </div>
    </div>
  );
}

export default App;
