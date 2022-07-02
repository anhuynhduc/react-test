import React from 'react';
import PropTypes from 'prop-types';
import {Box, Grid} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";

SkeletonListProduct.propTypes = {
    length: PropTypes.number
};

SkeletonListProduct.defaultProps = {
    length: 6
};

function SkeletonListProduct({length}) {
    return (
        <Box>
            <Grid container>
                {Array.from(new Array(length)).map((x, index) =>(
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Box style={{padding:'20px'}}>
                            <Skeleton variant="rect" width="100%" height={120}/>
                            <Skeleton/>
                            <Skeleton width="60%"/>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default SkeletonListProduct;