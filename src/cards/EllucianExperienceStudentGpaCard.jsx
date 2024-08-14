import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Button } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import React from 'react';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, PieChart, Line } from 'recharts';
import mapGpaToColor from '../helpers/map-gpa-to-color';
import gpaGauge from '../components/gpa-gauge';

const styles = () => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    },
    button: {
      bottom: spacing40,
      right: spacing40,
      position: "absolute"
    }
});

const EllucianExperienceStudentGpaCard = (props) => {
    const {
        classes,
        cardControl: { setLoadingStatus, setErrorMessage },
        data: { getEthosQuery },
        cardInfo: { configuration: { buttonLabel, buttonUrl } } } = props;

    const [studentGpaData, setStudentGpaData] = React.useState({
        cumulative: [],
        periodBased: []
    });
    const [selectedAcademicLevelIndex, setSelectedAcademicLevelIndex] = React.useState(0);
    const ref = React.useRef(null);
    React.useEffect(() => {
      console.log('width', ref);
    }, [ref.current]);

    React.useEffect(() => {
        (async () => {
          setLoadingStatus(true);
          try {
            const fetchedResult = await getEthosQuery({ queryId: "gpa-data" });
            const {
              data: {
                studentGradePointAverages1: {
                  edges: [
                    {
                      node: { periodBased, cumulative }
                    }
                  ]
                }
              }
            } = fetchedResult;
            const sortedPeriodBased = periodBased.sort((a, b) => (a.academicPeriod16.code > b.academicPeriod16.code ? 1 : -1));
            setSelectedAcademicLevelIndex(cumulative.findIndex(item => (item.academicLevel6.code = sortedPeriodBased.slice(-1)[0]?.academicLevel6.code)));
            setStudentGpaData({ cumulative: cumulative.filter(item => (item.academicLevel6.code==sortedPeriodBased.slice(-1)[0]?.academicLevel6.code)), periodBased: sortedPeriodBased.filter(item => (item.academicLevel6.code==sortedPeriodBased.slice(-1)[0]?.academicLevel6.code)) });
            setLoadingStatus(false);
          } catch (error) {
            setErrorMessage({
              headerMessage: "Fetch failed",
              textMessage:
                "Fetching data from student history has failed. Try again later.",
              iconName: "error",
              iconColor: "#D42828"
            });
          }
        })();
      }, []);

    const pieChartData = studentGpaData.cumulative.map( item => {
        return {
            name:item.academicLevel6.title,
            value:item.value,
            credits:item.earnedCredits
        }})

    const areaChartData = studentGpaData.periodBased.map( item => {
        return {
            name:item.academicPeriod16.title,
            earnedCredits: item.earnedCredits,
            missedCredits: item.attemptedCredits-item.earnedCredits,
            gpa: item.value
        }
    })

    return (
        <div className={classes.card} style={{height:120}} ref={ref}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={70} height={70}>
                <Pie
                    activeIndex={0}
                    activeShape={gpaGauge}
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={53}
                    outerRadius={60}
                    fill={mapGpaToColor(studentGpaData.cumulative[selectedAcademicLevelIndex]?.value)}
                    startAngle={240}
                    endAngle={-60}
                    dataKey="value"
                />
                </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer height={100}>
            <ComposedChart
            width={400}
            height={100}
            data={areaChartData}
            margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 0
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis hide={true} dataKey="name" />
            <YAxis hide={true}/>
            <YAxis yAxisId="gpa" domain={[0, 4]} hide={true}/>
            <Tooltip isAnimationActive={false} />
            <Area type="monotone" dataKey="earnedCredits" stackId="1" stroke="#ffc658" fill="#ffc658" yAxisId="0" />
            <Area type="monotone" dataKey="missedCredits" stackId="1" stroke="#8884d8" fill="#8884d8" yAxisId="0" />
            <Line type="monotone" dataKey="gpa" stroke="#44AACC" yAxisId="gpa" />
            </ComposedChart>
            </ResponsiveContainer>
            <Button onClick={() => {window.open(buttonUrl, '_blank').focus();}} className={classes.button}>{buttonLabel}</Button>
        </div>

    );
};

EllucianExperienceStudentGpaCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object.isrequired,
    data: PropTypes.object.isrequired,
    cardInfo: PropTypes.object.isrequired
};

export default withStyles(styles)(EllucianExperienceStudentGpaCard);
