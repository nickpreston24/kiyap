import { Flex, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Tooltip } from "@chakra-ui/react"
import React from "react"
import { Profile } from "../models/Setting";
import { ProfilePage } from "./profile";
import { SchoolsPage } from './school'
import { asPage } from "../components/templates/Page";
import { onSnapshot, castToSnapshot } from "mobx-state-tree";
import { useLocalStorage } from "../hooks";
import WishListPage from "./wishlist";
import Link from 'next/link'

import { RiAdminLine } from 'react-icons/ri'
import { IoSettingsOutline, IoSchoolOutline } from 'react-icons/io5'
import { FiGift } from 'react-icons/fi'
import AdminPage from "./admin";

const initialState = {
  name: "Mike Preston",
  sections:
  {
    "Account": {
      name: 'Account',
      settings:
      {
        "is_dev": {
          name: "Dev Mode",
          enabled: process.env.NODE_ENV === 'development'
        },
        "is_dark_mode": {
          name: "Dark Mode",
        },
        "show_out_of_stock": {
          name: "Show Out of Stock",
        },
      }
    }
    ,
    "Billing": {
      name: 'Billing',
      settings:
      {
        "show_account_num": {
          name: "Show Account Number"
        }
      }
    }
  }
}

export const Home = asPage()(() => {

  const [storedProfile, setProfile] = useLocalStorage('profile', undefined); // Must be undefined, or TS complains.

  let profile = !!storedProfile
    ? Profile.create(castToSnapshot(storedProfile))
    : Profile.create(initialState)

  onSnapshot(profile, profileSnapshot => {
    setProfile(profileSnapshot)
  })

  return (
    <Flex
      justify="center"
      maxWidth='900px'
      minWidth='400px'
      border='1px dodgerblue solid'
    >
      <Stack>
        <Heading
          bg='teal.100'
          color='pink.300'
        >
          Kiyapp
        </Heading>

        <Tabs
          variant="soft-rounded"
          // colorScheme="green"
          isLazy
          defaultIndex={3}
        >
          <TabList>
            <Tab
              _selected={{ color: "white", bg: "blue.300" }}
            ><Tooltip
              shouldWrapChildren
              placement='auto-start'
              label="Wishlist"
            >
                <FiGift />
              </Tooltip>
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "orange.300" }}
            >
              <Tooltip
                shouldWrapChildren
                placement='auto-start'
                label="Schools"
              >
                <IoSchoolOutline />
              </Tooltip>
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "green.300" }}
            >
              <Tooltip
                shouldWrapChildren
                placement='auto-start'
                label="Settings"
              >
                <IoSettingsOutline />
              </Tooltip>
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "red.300" }}
            >
              <Tooltip
                shouldWrapChildren
                placement='auto-start'
                label="Admin"
              >
                <RiAdminLine>
                  <Link href='/admin' />
                </RiAdminLine>
              </Tooltip>
            </Tab>
          </TabList>
          <TabPanels>

            <TabPanel>
              <WishListPage />
            </TabPanel>

            <TabPanel>
              <SchoolsPage profile={profile} />
            </TabPanel>

            <TabPanel>
              <ProfilePage profile={profile} />
            </TabPanel>

            <TabPanel>
              <AdminPage />
            </TabPanel>

          </TabPanels>
        </Tabs>

      </Stack>
    </Flex >
  )
})

export default Home



{/* <Link href="/wishlist">
    <Button colorScheme="blue">Wishlist</Button>
  </Link> */}

{/* <Link href="/school">
    <Button colorScheme="blue">Schools</Button>
  </Link> */}