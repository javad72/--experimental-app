import { useDrop } from "react-dnd";
import { useCallback } from "react";
import ComponentSettings from "./component-setting";

const FormBuilder = ({ components, setComponents }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "component",
        drop: (item) => {
            setComponents((prev) => [...prev, { type: item.type, id: Date.now() }]);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const moveComponent = useCallback((dragIndex, hoverIndex) => {
        setComponents((prevComponents) => {
            const newComponents = [...prevComponents];
            const [draggedComponent] = newComponents.splice(dragIndex, 1);
            newComponents.splice(hoverIndex, 0, draggedComponent);
            return newComponents;
        });
    }, [setComponents]);

    const updateComponent = (id, updates) => {
        setComponents((prev) => prev.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp)));
    };

    return (
        <div
            ref={drop}
            style={{
                minHeight: "300px",
                backgroundColor: isOver ? "#f3f4f6" : "#fff",
                padding: "10px",
                borderRadius: "5px",
                border: "1px dashed #ccc",
            }}
        >
            {components.length === 0 && (
                <p style={{ textAlign: "center", color: "#666" }}>کامپوننت‌ها را اینجا بکشید</p>
            )}
            {components.map((comp, index) => (
                <div key={comp.id} style={{ marginBottom: "20px" }}>
                    <ComponentSettings
                        component={comp}
                        updateComponent={updateComponent}
                        index={index}
                        moveComponent={moveComponent}
                    />
                </div>
            ))}
        </div>
    );
};

export default FormBuilder;