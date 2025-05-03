import { Table } from "antd"

function App() {

  return (
   <div>
    <div className="px-8 py-4 mb-8 border-b border-neutral-300 text-xl font-bold">
      DMS
    </div>
   <Table dataSource={dataSource} columns={columns} />
   </div>
  )
}

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

export default App
