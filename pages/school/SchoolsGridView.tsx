import React from 'react';
import { Grid, GridItem } from "@chakra-ui/react";
import { SchoolCard } from './SchoolCard';

export const SchoolsGridView = ({ schools = [] }) => {
    return (
        <Grid>
            {schools.map((school, i) => {
                return (
                    <GridItem key={i}>
                        <SchoolCard school={school} />
                    </GridItem>
                );
            })}
        </Grid>
    );
};
