import React, { useState, useEffect } from 'react';
import './App.css';
import { FcPrevious, FcNext } from 'react-icons/fc';
import { MdDeleteForever } from 'react-icons/md';

const getLocalStorage = () => {
  let countersList = localStorage.getItem('countersList');
  if (countersList) {
    return JSON.parse(localStorage.getItem('countersList'));
  } else {
    return [];
  }
};

const getTotalCount = () => {
  let totalCount = localStorage.getItem('totalCount');
  if (totalCount) {
    return JSON.parse(localStorage.getItem('totalCount'));
  } else {
    return 0;
  }
};

const App = () => {
  const [totalCount, setTotalCount] = useState(getTotalCount());
  const [countersList, setCountersList] = useState(getLocalStorage());
  const [counterName, setCounterName] = useState('');

  const handleChange = (event) => {
    setCounterName(event.target.value);
  };

  const handleSubmit = () => {
    const newCounter = {
      id: new Date().getTime().toString(),
      title: counterName,
      count: 0,
    };
    setCountersList([...countersList, newCounter]);
    setCounterName('');
  };

  useEffect(() => {
    localStorage.setItem('countersList', JSON.stringify(countersList));
  }, [countersList]);

  const handleIncrease = (index) => {
    const newCountersList = [...countersList];
    newCountersList[index].count++;
    setCountersList(newCountersList);
    calculateTotal();
  };

  const handleDecrease = (index) => {
    const newCountersList = [...countersList];
    newCountersList[index].count--;
    if (newCountersList[index].count < 0) {
      return (newCountersList[index].count = 0);
    }
    setCountersList(newCountersList);
    calculateTotal();
  };

  const calculateTotal = () => {
    const totalCount = countersList.reduce((total, counter) => {
      return total + counter.count;
    }, 0);
    setTotalCount(totalCount);
  };

  useEffect(() => {
    localStorage.setItem('totalCount', JSON.stringify(totalCount));
  }, [totalCount]);

  const handleDelete = (id, index) => {
    const newCountersList = [...countersList];
    newCountersList[index].count = 0;
    setCountersList(newCountersList);
    setCountersList(countersList.filter((el) => el.id !== id));
    calculateTotal();
  };

  return (
    <div className='container'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>COUNTER APP</h1>
        <h2>Total Count : {totalCount}</h2>
      </div>

      <div className='input-group'>
        <span className='input-group-text'>NEW COUNTER</span>
        <input
          type='text'
          className='form-control'
          placeholder='enter a counter name'
          value={counterName}
          onChange={handleChange}
        />
        <button
          type='submit'
          className='btn btn-outline-primary'
          onClick={handleSubmit}
        >
          Add Counter
        </button>
      </div>
      <div style={{ margin: '1rem' }}>
        {countersList.map((list, index) => {
          return (
            <div className='list-group list-group-flush border border-dark'>
              <div
                className='list-group-item'
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex' }}>
                  <button
                    className='btn'
                    style={{
                      color: 'red',
                      marginRight: '1rem',
                      lineHeight: '0',
                    }}
                    onClick={() => handleDelete(list.id, index)}
                  >
                    <MdDeleteForever />
                  </button>
                  <h4 style={{ color: 'green' }} key={list.id}>
                    {list.title}
                  </h4>
                </div>

                <div style={{ display: 'flex' }}>
                  <button
                    className='btn'
                    style={{ lineHeight: 0 }}
                    onClick={() => handleDecrease(index)}
                  >
                    <FcPrevious />
                  </button>
                  <h4
                    style={{
                      color: 'green',
                    }}
                  >
                    {list.count}
                  </h4>
                  <button
                    className='btn'
                    style={{ lineHeight: 0 }}
                    onClick={() => handleIncrease(index)}
                  >
                    <FcNext />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
