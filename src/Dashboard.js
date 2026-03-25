import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((res) => {
                // Convert API → chart data
                const formatted = res.slice(0, 5).map((item, index) => ({
                    name: item.name.split(" ")[0],
                    value: (index + 1) * 200,
                }));

                setData(formatted);
                setLoading(false);
            })
            .catch(() => {
                setError("Network request failed");
                setLoading(false);
            });
    }, []);

    return (
        <div style={styles.page}>

            {/* HEADER */}
            <div style={styles.header}>
                ☰ My Dashboard
            </div>

            <div style={styles.container}>

                {/* CARD 1 */}
                <div style={styles.card}>
                    <h4>Anzahl Veedel</h4>

                    {loading && <p>Loading...</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {!loading && !error && (
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#4CAF50" /> {/* GREEN */}
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* CARD 2 */}
                <div style={styles.card}>
                    <h4>Einwohner je Stadtteil</h4>

                    {loading && <p>Loading...</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {!loading && !error && (
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#2196F3"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>

            </div>
        </div>
    );
}

const styles = {
    page: {
        fontFamily: "Arial",
        background: "#f5f5f5",
        minHeight: "100vh",
    },

    header: {
        height: "60px",
        background: "#3f51b5",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        fontSize: "18px",
    },

    container: {
        display: "flex",
        gap: "20px",
        padding: "20px",
        flexWrap: "wrap",
    },

    card: {
        flex: 1,
        background: "#fff",
        padding: "15px",
        borderRadius: "6px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
};