import React, { memo, useEffect, useState } from 'react';
import { Paginator } from 'primereact/paginator';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import SkeletonLoader from './skeletonLoader';
import 'primeflex/primeflex.css';
import { Accordion, AccordionTab } from 'primereact/accordion';
import RepoChart from '../Chart';
import { useSelector, useDispatch } from 'react-redux';
import { getRepoList, getContributorsByPerUser, getCodeFreq, getCommitActivity, getSetLoading } from '../../../redux/actions';

function RepoList(props) {
    const [paginationParams, setParams] = useState({
        first: 0, page: 1, pageCount: 0, rows: 10
    });
    const [activeIndex, setActiveIndex] = useState(-1);
    const { isLoading, repoList } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        getGitRepoList(0);
        // eslint-disable-next-line
    }, []);

    function getGitRepoList(page) {
        dispatch(getSetLoading(true));
        dispatch(getRepoList(page+1));
    }

    function onPageChange(param) {
        setParams(param);
        let page = param.page;
        setActiveIndex(-1);
        getGitRepoList(page);
    }

    const itemTemplate = (repo) => {
        return (
            <div className="col-12" >
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={repo.owner.avatar_url} alt={''} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{repo.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <span className="font-semibold">{repo.description}</span>
                                </span>
                            </div>
                            <div className="flex align-items-center gap-3">
                                <Tag value={repo.stargazers_count} severity={'success'}></Tag>
                                <Tag value={repo.open_issues} severity={'success'}></Tag>
                                <span className="font-semibold">Last pushed at {moment(repo.pushed_at).isValid ? moment(repo.pushed_at).format('do-MMM-YYYY HH:mm A') : ''} by {repo.owner.login}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    function handelClickOnAcc(e) {
        let ind = e.index;
        setActiveIndex(ind);
        const currUser = repoList?.items[ind];
        if(currUser){
            dispatch(getCommitActivity(currUser.full_name));
            dispatch(getCodeFreq(currUser.full_name));
            dispatch(getContributorsByPerUser(currUser.full_name));
        }
    }


    return (<>
        <div className="card" >
            {isLoading ? <SkeletonLoader />
                : <Accordion activeIndex={activeIndex} onTabChange={(e) => handelClickOnAcc(e)}>
                    {repoList?.items?.map((rep, key) => {
                        return <AccordionTab key={`acc${key}`} header={itemTemplate(rep)}>
                            <RepoChart />
                        </AccordionTab>
                    })}
                </Accordion>
            }
            <Paginator
                className="justify-content-end"
                rows={5}
                first={paginationParams.first}
                totalRecords={repoList?.total_count || 0}
                onPageChange={(e) => { onPageChange(e) }} />
        </div>
    </>)
}
export default memo(RepoList);

