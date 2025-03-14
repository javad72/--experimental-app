import { useDrag, useDrop } from "react-dnd";
import { useEffect, useState, useRef } from "react";

const ComponentSettings = ({ component, updateComponent, index, moveComponent }) => {
    const [open, setOpen] = useState(true);
    const [height, setHeight] = useState("auto");

    const ref = useRef(null);

    // تنظیم قابلیت drag
    const [{ isDragging }, drag] = useDrag({
        type: "component-settings", // نوع آیتم برای شناسایی در drag and drop
        item: { id: component.id, index }, // اطلاعاتی که هنگام کشیدن منتقل می‌شود
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // تنظیم قابلیت drop
    const [{ isOver }, drop] = useDrop({
        accept: "component-settings", // فقط آیتم‌هایی با این نوع را قبول می‌کند
        hover: (item, monitor) => {
            if (!ref.current) return;

            const dragIndex = item.index; // اندیس کامپوننت در حال کشیدن
            const hoverIndex = index; // اندیس کامپوننت هدف

            if (dragIndex === hoverIndex) return; // اگر روی خودش باشد، کاری انجام نشود

            moveComponent(dragIndex, hoverIndex); // جابجایی کامپوننت‌ها
            item.index = hoverIndex; // به‌روزرسانی اندیس آیتم در حال کشیدن
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    // اتصال drag و drop به ref
    drag(drop(ref));

    useEffect(() => {
        switch (component.type) {
            case "input":
                setHeight("283px");
                break;
            case "select":
                setHeight("288px");
                break;
            case "range":
                setHeight("363px");
                break;
            default:
                setHeight("auto");
        }
    }, [component]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateComponent(component.id, { [name]: value });
    };

    const boxOpenHandle = () => {
        setOpen(!open);
    };

    return (
        <div
            ref={ref}
            className={`form-builder ${component.type}-color`}
            style={{
                height: open ? height : "40px",
                opacity: isDragging ? 0.5 : 1,
                cursor: "move",
                // backgroundColor: isOver ? "#f0f0f0" : "auto", // تغییر رنگ هنگام hover
            }}
        >
            <div className="title-component-icon-box">
                <a href="#" onClick={boxOpenHandle}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className={`bi bi-chevron-left ${open && "-rotate-90"}`}
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                        />
                    </svg>
                </a>
                <a href="#" className="title-box" onClick={boxOpenHandle}>
                    {component.title || ""}
                </a>
            </div>
            <div className="drag-handle-icon-box">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-three-dots"
                    viewBox="0 0 16 16"
                >
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                </svg>
            </div>
            <div style={{ display: open ? "block" : "none" }}>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    لیبل:
                    <input type="text" name="title" value={component.title || ""} onChange={handleChange} style={{ marginTop: "5px" }} />
                </label>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    نام انگلیسی:
                    <input type="text" name="name" value={component.name || ""} onChange={handleChange} style={{ marginTop: "5px" }} />
                </label>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    placeholder:
                    <input type="text" name="placeholder" value={component.placeholder || ""} onChange={handleChange} style={{ marginTop: "5px" }} />
                </label>
                {component.type === "input" && (
                    <>
                        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            نوع:
                            <select name="inputType" value={component.inputType || "text"} onChange={handleChange} style={{ marginTop: "5px" }}>
                                <option value="text">رشته</option>
                                <option value="number">عدد</option>
                                <option value="color">رنگ</option>
                                <option value="checkbox">چک‌باکس</option>
                                <option value="radio">رادیو</option>
                            </select>
                        </label>
                        <label>
                            الزامی:
                            <input type="checkbox" name="require" checked={component.require || false} onChange={(e) => updateComponent(component.id, { require: e.target.checked })} />
                        </label>
                    </>
                )}
                {component.type === "select" && (
                    <>
                        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            نوع:
                            <select name="selectType" value={component.selectType || "single"} onChange={handleChange} style={{ marginTop: "5px" }}>
                                <option value="single">معمولی</option>
                                <option value="multiple">چندتایی</option>
                            </select>
                        </label>
                        <label>
                            الزامی:
                            <input type="checkbox" name="require" checked={component.require || false} onChange={(e) => updateComponent(component.id, { require: e.target.checked })} />
                        </label>
                    </>
                )}
                {component.type === "range" && (
                    <>
                        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            حد کم:
                            <input type="number" name="min" value={component.min || ""} onChange={handleChange} />
                        </label>
                        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            حد بالا:
                            <input type="number" name="max" value={component.max || ""} onChange={handleChange} />
                        </label>
                        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            اندازه:
                            <input type="number" name="step" value={component.step || ""} onChange={handleChange} />
                        </label>
                        <label>
                            الزامی:
                            <input type="checkbox" name="require" checked={component.require || false} onChange={(e) => updateComponent(component.id, { require: e.target.checked })} />
                        </label>
                    </>
                )}
            </div>
        </div>
    );
};
export default ComponentSettings ;