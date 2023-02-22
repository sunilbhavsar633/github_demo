import React, { memo, useLayoutEffect, useState } from "react";
import { Chart } from 'primereact/chart';
import moment from 'moment';
import { useSelector } from 'react-redux';

function RepoChart(props) {
    const [chartData, setChartData] = useState();
    const { codeFrequency, contributors, commitActivity } = useSelector((state) => state);
    useLayoutEffect(() => {
        const label = [];
        const addData = [];
        const delData = [];
        const codeFrequencyArr = codeFrequency && codeFrequency.length>0?[...codeFrequency]:[];
        if (codeFrequencyArr.length > 0) {
            const newArrayOfObj = codeFrequencyArr.map(({
                0: date,
                1: additions,
                2: deletions,
                ...rest
            }) => ({
                date,
                additions,
                deletions,
                ...rest
            }));

            newArrayOfObj.map((it, key) => {
                label.push(moment(it.date).format('DD-MMMM-YYYY'));
                addData.push(it.additions);
                delData.push(it.deletions);
                return 0;
            })
            const cData = {
                labels: label,
                datasets: [
                    {
                        label: 'Additions',
                        data: addData,
                        fill: false,
                        // borderColor: documentStyle.getPropertyValue('--blue-500'),
                        tension: 0.4
                    },
                    {
                        label: 'Deletions',
                        data: delData,
                        fill: false,
                        // borderColor: documentStyle.getPropertyValue('--pink-500'),
                        tension: 0.4
                    }
                ]
            };
            setChartData(cData)
            console.log(cData);
        }
    }, [codeFrequency])

    return (<>
        <Chart type="line" data={chartData} />
    </>)
}
export default memo(RepoChart)