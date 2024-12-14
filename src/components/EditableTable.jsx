import React, { useRef } from "react";
import PropTypes from "prop-types";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator.min.css";
import "./styles.css"; // Add custom CSS here
import { toast } from "react-toastify";

const EditableTable = ({ data, onTaskUpdate, onTaskDelete }) => {
    const tableRef = useRef();

    const customSelectEditor = (cell, onRendered, success, cancel) => {
        const values = ["To Do", "In Progress", "Done"];
        const select = document.createElement("select");

        values.forEach((option) => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            select.appendChild(opt);
        });

        select.value = cell.getValue();
        select.style.width = "100%";
        select.style.boxSizing = "border-box";

        select.addEventListener("change", () => { success(select.value); toast.success("✔️ Status updated successfully!")});
        select.addEventListener("blur", () => cancel());

        onRendered(() => {
            select.style.cssText = "position: relative; z-index: 1000;";
        });

        return select;
    };

    const columns = [
        { title: "Task ID", field: "id", editor: false },
        { title: "Title", field: "title", editor: "input" },
        {
            title: "Description", field: "description", editor:"textarea", formatter:"textarea", variableheight:true},
        {
            title: "Status",
            field: "status",
            editor: customSelectEditor,
            cellClick: (e, cell) => {
                cell.edit();
            },
        },
        {
            title: "Actions",
            field: "actions",
            formatter: () => `<button>Delete</button>`,
            cellClick: (e, cell) => onTaskDelete && onTaskDelete(cell.getData().id),
        },
    ];

    const handleCellEdited = (cell) => {
        const updatedData = cell.getData(); // Full row data
        const updatedField = cell.getField(); // Field name that was updated

        // Pass both the updated data and field name to the parent
        onTaskUpdate(updatedData, updatedField);
        onTaskUpdate(updatedData, updatedField);
    };

    return (
        <ReactTabulator
            ref={tableRef}
            data={data}
            columns={columns}
            layout="fitData"
            // cellEdited={(cell) => onTaskUpdate && onTaskUpdate(cell.getData())}
            cellEdited={handleCellEdited} // Callback for cell edit
        />
    );
};

EditableTable.propTypes = {
    data: PropTypes.array.isRequired,
    onTaskUpdate: PropTypes.func.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
};

export default EditableTable;
