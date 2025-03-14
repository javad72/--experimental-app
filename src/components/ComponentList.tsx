import { useDrag } from "react-dnd";

const ComponentItem = ({ type, label , color }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "component",
        item: { type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                padding: "10px",
                margin: "5px 0",
                backgroundColor: color,
                borderRadius: "5px",
                cursor: "move",
                textAlign: "center",
            }}
        >
            {label}
        </div>
    );
};

const ComponentList = () => {
    return (
        <div>
            <ComponentItem color='rgb(253, 236, 214)' type="input" label="فیلد" />
            <ComponentItem color='rgb(245 214 253)' type="select" label="چند گزینه ای" />
            <ComponentItem color='rgb(218 253 214)' type="range" label="رنج" />
        </div>
    );
};

export default ComponentList;