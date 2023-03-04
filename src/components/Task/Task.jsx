import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Task({ itemTask, deletedTask, onCompletedTask, onEditingTask, editingTask, stopTimer, startTimer }) {
  const [inputValue, setInputValue] = useState('');

  const onInputValueChange = (e) => setInputValue(e.target.value);

  function onSubmit(e) {
    e.preventDefault();
    if (inputValue !== '' && inputValue.length >= 2) {
      editingTask(itemTask.id, inputValue);
    }
  }

  const { label, timerTime, condition, visibility, timeInterval } = itemTask;

  const minute = Math.trunc(timerTime / 60);
  const second = Math.floor(timerTime % 60);

  return (
    <li className={`${condition} ${visibility}`}>
      <div className="view">
        <label>
          <input className="toggle" type="checkbox" id="inputCheckbox" onClick={onCompletedTask} />
          <span className="title" onClick={onCompletedTask} aria-hidden="true">
            {label}
          </span>
          {timerTime !== 0 ? (
            <span className="description">
              <button
                type="button"
                className="icon icon-play"
                title="play timer"
                aria-label="play timer"
                label="play"
                onClick={startTimer}
              />
              <button
                type="button"
                className="icon icon-pause"
                title="pause timer"
                aria-label="pause timer"
                label="pause"
                onClick={stopTimer}
              />
              {minute}:{second < 10 ? `0${second}` : second}
            </span>
          ) : null}
          <span className="description">created {timeInterval}</span>
        </label>
        <button
          type="button"
          className="icon icon-edit"
          onClick={() => {
            onEditingTask();
          }}
          title="on edit"
          aria-label="on edit"
        />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={deletedTask}
          title="on destroy"
          aria-label="on destroy"
        />
      </div>
      {condition === 'editing' ? (
        <form onSubmit={onSubmit}>
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            type="text"
            className="edit"
            defaultValue={label}
            onChange={onInputValueChange}
          />
        </form>
      ) : null}
    </li>
  );
}

Task.defaultProps = {
  itemTask: {
    condition: 'view',
    visibility: null,
  },
};

Task.propTypes = {
  itemTask: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    condition: PropTypes.string,
    visibility: PropTypes.string,
    timeInterval: PropTypes.string,
  }),
};

export default Task;
