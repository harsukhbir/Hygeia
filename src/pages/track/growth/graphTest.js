import React from "react";
import { View, Text} from "react-native";
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts'

class GrahDemo extends React.Component {
    render() {

        const graphData = [
            {
                date: "March",
                point: 10
            },
            {
                date: "March",
                point: 12
            },
            {
                date: "March",
                point: 15
            },
            {
                date: "April",
                point: 300
            },
            {
                date: "April",
                point: 35
            },
            {
                date: "April",
                point: 40
            },
            {
                date: "May",
                point: 20
            },
            {
                date: "Jun",
                point: -1
            }
        ]

        const lineSvg = { strokeWidth: 2, stroke: 'black' };
        const axesSvg = { fill: "red", y:10};
        const horizontalContentInset = { left: 27, right: 25 };

        const verticalContentInset = { top: 6, bottom: 15 };

        const xAxisContainer = {
            marginHorizontal: 0,
            height: 50,
            marginBottom: 0
        }
        let copyGraphData = graphData;
        let getUniqueGraphPoint = [];
        getUniqueGraphPoint = [...new Set(copyGraphData.map(a => a.date))];
        return (
            <View style={{height: 300}}>
                <LineChart
                    svg={ lineSvg }
                    style={{ flex: 1 }}
                    data={ graphData }
                    xAccessor={({ index }) => index}
                    yAccessor={ ({ item }) => (item.point === -1) ? null : Number(item.point) }
                    animate={true}
                    animationDuration={5000}
                >
                </LineChart>
                <XAxis
                    style={ xAxisContainer }
                    data={ getUniqueGraphPoint }
                    contentInset={ horizontalContentInset }
                    formatLabel={ (_, index) => getUniqueGraphPoint[index] }
                    svg={ axesSvg }
                />
                <YAxis
                    data={ graphData }
                    yAccessor={({ index }) => index}
                    formatLabel={ (index) => {return graphData[index].point }}
                    numberOfTicks={ graphData.length }
                    contentInset={ verticalContentInset }
                    svg={{ fill: 'red'}}
                />
            </View>
        )
    }
}

export default GrahDemo;