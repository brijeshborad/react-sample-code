import React, { useState } from 'react'
import { Picky } from 'react-picky'
import 'react-picky/dist/picky.css'

function CustomSelect (props) {
  const [newValue, setNewValue] = useState('')

  if (props.multiple) {
    return (
      <Picky
        className={`dropdown dropdown-multiple ${props.value.length > 0 ? 'btn-active' : ''}
                 ${props.buttonClass ? props.buttonClass : ''}`}
        style={props.style}
        value={(props.value.length > 0 ? props.value : [])}
        multiple
        buttonProps={{ className: props.error ? 'error' : '' }}
        placeholder={props.placeholderText || 'Search & Select'}
        numberDisplayed={0}
        defaultFocusFilter={true}
        manySelectedPlaceholder="Search & Select"
        filterPlaceholder={'Search...'}
        clearFilterOnClose={true}
        valueKey="value"
        labelKey="label"
        dropdownHeight={350}
        includeSelectAll={props.selectAll || false}
        renderSelectAll={({ allSelected, toggleSelectAll }) => {
          if (props.selectAll) {
            return (
              <li className={allSelected === 'all' ? 'selected' : ''}
                  onClick={() => toggleSelectAll()}>
                <input type="checkbox" checked={allSelected === 'all'} readOnly/>
                <span>Does not matter</span>
              </li>
            )
          }
        }}
        render={({ style, isSelected, item, selectValue, labelKey, valueKey }) => {
          return (
            <li style={style}
                className={isSelected ? 'selected' : ''}
                key={item[valueKey]}
                onClick={() => selectValue(item)}>
              <input type="checkbox" checked={isSelected} readOnly/>
              <span>{item[labelKey]}</span>
            </li>
          )
        }}
        includeFilter={true}
        onChange={event => props.changeEvent(props.name, event, true)}
        options={props.options}/>
    )
  } else if (props.searchable) {
    return (
      <Picky
        className={`dropdown searchable ${props.value ? 'btn-active' : ''}
                 ${props.buttonClass ? props.buttonClass : ''}`}
        style={props.style}
        buttonProps={{ className: props.error ? 'error' : '' }}
        value={props.value || undefined}
        placeholder={'Search & Select'}
        defaultFocusFilter={true}
        filterPlaceholder={'Search...'}
        clearFilterOnClose={true}
        valueKey="value"
        disabled={props.disabled}
        keepOpen={false}
        labelKey="label"
        dropdownHeight={350}
        render={({ style, isSelected, item, selectValue, labelKey, valueKey }) => {
          return (
            <li style={style}
                className={isSelected ? 'selected' : ''}
                key={item[valueKey]}
                onClick={() => selectValue(item)}>
              {/*<input type="checkbox" checked={isSelected} readOnly/>*/}
              <span>{item[labelKey]}</span>
            </li>
          )
        }}
        includeFilter={true}
        onChange={event => props.changeEvent(props.name, event)}
        options={props.options}/>
    )
  } else if (props.creatable) {
    return (
      <Picky
        className={`dropdown creatable ${props.value ? 'btn-active' : ''}
                 ${props.buttonClass ? props.buttonClass : ''}`}
        style={props.style}
        value={props.value || undefined}
        placeholder={'Search & Select'}
        buttonProps={{ className: props.error ? 'error' : '' }}
        defaultFocusFilter={true}
        filterPlaceholder={'Search...'}
        clearFilterOnClose={true}
        getFilterValue={(term => {
          setNewValue(term)
        })}
        valueKey="value"
        keepOpen={false}
        labelKey="label"
        dropdownHeight={350}
        renderList={({ items, selected, multiple, selectValue, getIsSelected }) => {
          if (items.length > 0) {
            items = items.map(item => (
              <li className={getIsSelected(item) ? 'selected' : ''}
                  key={item.value}
                  onClick={() => selectValue(item)}>
                <input type="checkbox" checked={getIsSelected(item)} readOnly/>
                <span>{item.label.indexOf('(') > 1 ? item.label.substring(0, item.label.indexOf('(')) : item.label}</span>
              </li>
            ))
            return items
          } else {
            return (
              <button type="button" className="btn btn-default new-data"
                      onClick={() => props.onCreateEvent(newValue)}>
                Add new '{newValue}'
              </button>
            )
          }
        }}
        includeFilter={true}
        onChange={event => props.changeEvent(props.name, event)}
        options={props.options}/>
    )
  } else {
    return (
      <Picky
        className={`dropdown dropdown-single ${props.value ? 'btn-active' : ''}
                 ${props.buttonClass ? props.buttonClass : ''}`}
        style={props.style}
        value={props.value || undefined}
        buttonProps={{ className: props.error ? 'error' : '' }}
        placeholder={props.placeholderText || 'Select'}
        numberDisplayed={0}
        valueKey="value"
        keepOpen={false}
        labelKey="label"
        dropdownHeight={250}
        render={({ style, isSelected, item, selectValue, labelKey, valueKey }) => {
          return (
            <li style={style}
                className={isSelected ? 'selected' : ''}
                key={item[valueKey]}
                onClick={() => selectValue(item)}>
              <span>{item[labelKey]}</span>
            </li>
          )
        }}
        onChange={event => props.changeEvent(props.name, event)}
        options={props.options}/>
    )
  }
}

export default CustomSelect
