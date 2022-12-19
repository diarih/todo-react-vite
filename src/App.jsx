import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [newData, setNewData] = useState({
    title: '',
    text: '',
  })

  const handlerChange = (e) => {
    const { name, value } = e.target
    setNewData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    if (newData.edit) {
      // setData(data.map((item, index) => {
      //   if (index === newData.editId) {
      //     return {
      //       title: newData.title,
      //       text: newData.text
      //     }
      //   }
      // }))
      setData((prev) => {
        prev[newData.editId] = {
          title: newData.title,
          text: newData.text
        }
        return prev
      })

    }
    else {
      setData((prev) => {
        return [...prev, newData]
      })
    }
    setNewData({
      title: '',
      text: '',
      edit: false
    })
  }

  const removed = (id) => {
    setData(data.filter((item, index) => index !== id))
  }

  const edit = (id) => {
    setNewData({
      title: data[id].title,
      text: data[id].text,
      editId: id,
      edit: true
    })
  }

  return (
    <div className="App container">
      <div className="mb-5 row row-cols-lg-4 row-cols-1">
        <div className="card mx-auto">
          <div className="card-body">
            <h5 className="card-title">What Need TO DO?</h5>
            <form onSubmit={handlerSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input name='title' type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => handlerChange(e)} value={newData.title} required />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Task To Do or What To Do</label>
                <textarea name='text' className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => handlerChange(e)} value={newData.text} required></textarea>
              </div>
              <div className="">
                <button className="btn btn-primary" type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-lg-4 g-4">
        {
          data.map((item, index) => {
            return (
              <div className="col" key={index}>
                <Card title={item.title} text={item.text} id={index} removed={removed} edit={edit} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

function Card({ title, text, id, removed, edit }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>
      <div className="p-3">
        <button onClick={() => removed(id)} className="btn btn-danger me-2">Delete</button>
        <button onClick={() => edit(id)} className="btn btn-warning">Edit</button>
      </div>
    </div>
  )
}

export default App
