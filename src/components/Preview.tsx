export const Preview = ({ components }) => {
    return (
        <form
            style={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
        >
            {components.map((comp) => {
                switch (comp.type) {
                    case "input":
                        return (
                            <div key={comp.id} style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>
                                    {comp.title || "Input"}
                                </label>
                                <input
                                    type={comp.inputType || "text"}
                                    name={comp.name || ""}
                                    placeholder={comp.placeholder || ""}
                                    required={comp.require || false}
                                    min={comp.min}
                                    max={comp.max}
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                    }}
                                />
                            </div>
                        );
                    case "select":
                        return (
                            <div key={comp.id} style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>
                                    {comp.title || "Select"}
                                </label>
                                <select
                                    name={comp.name || ""}
                                    multiple={comp.selectType === "multiple"}
                                    required={comp.require || false}
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                    }}
                                >
                                    <option value="">یک گزینه انتخاب کنید</option>
                                    <option value="option1">گزینه 1</option>
                                    <option value="option2">گزینه 2</option>
                                </select>
                            </div>
                        );
                    case "range":
                        return (
                            <div key={comp.id} style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>
                                    {comp.title || "Range"}
                                </label>
                                <input
                                    type="range"
                                    name={comp.name || ""}
                                    required={comp.require || false}
                                    min={comp.min || 0}
                                    max={comp.max || 100}
                                    step={comp.step || 1}
                                    style={{ width: "100%" }}
                                />
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </form>
    );
};