import React, { memo, useState, useEffect } from "react";
import { Chart } from 'primereact/chart';
import moment from 'moment';
import { useSelector } from 'react-redux';

function RepoChart(props) {
    const [chartDataForCf, setChartDataForCf] = useState();
    const [chartDataForCont, setChartDataForCont] = useState();
    const [chartDataForCommit, setChartDataForCommit] = useState();
    const { codeFrequency, contributors, commitActivity } = useSelector((state) => state);

    useEffect(() => {
        const codeFrequencyArr = codeFrequency && codeFrequency.length > 0 ? [...codeFrequency] : [];
        if (codeFrequencyArr.length > 0) {
            const label = [];
            const addData = [];
            const delData = [];
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
                        tension: 0.4
                    },
                    {
                        label: 'Deletions',
                        data: delData,
                        fill: false,
                        tension: 0.4
                    }
                ]
            };
            setChartDataForCf(cData)
        }
        if (Object.keys(contributors).length > 0) {
            const label = [];
            const addData = [];
            const delData = [];
            const comData = [];
            const dataObj = JSON.parse(JSON.stringify(contributors[0]));
            dataObj.weeks.map((it, key) => {
                label.push(moment(it.w).format('L'));
                addData.push(it.a);
                delData.push(it.d);
                comData.push(it.c);
                return 0;
            })
            const cData = {
                labels: label,
                datasets: [
                    {
                        label: 'Additions',
                        data: addData,
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: 'Deletions',
                        data: delData,
                        fill: false,
                        tension: 0.4
                    }, {
                        label: 'Commit',
                        data: comData,
                        fill: false,
                        tension: 0.4
                    }
                ]
            };
            setChartDataForCont(cData)
        }
        if (Object.keys(commitActivity).length > 0) {
            const label = [];
            const comData = [];
            const dataObj = [...commitActivity];
            dataObj.map((it, key) => {
                label.push(moment(it.week).format('DD-MMMM-YYYY'));
                comData.push(it.total);
                return 0;
            })
            const cData = {
                labels: label,
                datasets: [
                    {
                        label: 'Commit',
                        data: comData,
                        fill: false,
                        tension: 0.4
                    }
                ]
            };
            setChartDataForCommit(cData)
        }
    }, [codeFrequency, contributors, commitActivity])

    return (<>
        <div className=""><h4>Weekly additions/deletions activity</h4>{chartDataForCf ? <Chart type="line" data={chartDataForCf} /> : 'No data Found'}</div>
        <div className=""><h4>Weekly commits activity</h4>{chartDataForCommit ? <Chart type="line" data={chartDataForCommit} /> : 'No data Found'}</div>
        <div className=""><h4>Weekly additions/deletions/commits activity</h4>{chartDataForCont ? <Chart type="line" data={chartDataForCont} /> : 'No data Found'}</div>
    </>)
}
export default memo(RepoChart)