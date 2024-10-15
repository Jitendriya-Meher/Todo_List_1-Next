import React from "react";

const Todo = ( {item,index,deleteTodo,CompleteTodo} ) => {

    // console.log("item",item);

  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b text-justify">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {index+1}
      </th>
      <td className={`px-6 py-4 ${item.isCompleted?"line-through":""}`}>
        {item.title}
      </td>
      <td className={`px-6 py-4 ${item.isCompleted?"line-through":""}`}>
        {item.description}
      </td>
      <td className="px-6 py-4">
        {
            item.isCompleted ? "Completed" : "Pending"
        }
      </td>
      <td className="px-6 py-4 flex gap-1">
        <button className=" py-2 px-4 bg-red-500 text-white hover:bg-red-600 rounded-sm"
        onClick={()=>{
            deleteTodo(item.id);
        }}>
            Delete
        </button>
        {
            !item.isCompleted && <button className=" py-2 px-4 bg-green-500 text-white rounded-sm hover:bg-green-600"
            onClick={()=>{
                CompleteTodo(item.id);
            }}>
                Done
            </button>
        }
      </td>
    </tr>
  );
};

export default Todo;
