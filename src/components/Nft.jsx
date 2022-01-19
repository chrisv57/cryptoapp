import { Input, Row, Col, Collapse, Typography, Select, Card } from "antd";
import React, { useEffect, useState } from "react";
import { useGetNftQuery } from "../services/nftApi";
import Loader from './Loader';

const { Option } = Select;
const Nft = () => {
  const [timePeriod, setTimePeriod] = useState("1d");
  const { data: nftList, isFetching } = useGetNftQuery(timePeriod);
  const [nfts, setNfts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = nftList?.filter((nft) => (
      nft.nft_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    );
    setNfts(filteredData);
  }, [nftList, searchTerm]);

  if (isFetching) return <Loader />;
  return (
    <>
      <div className="search-nft">
        <Row>
          <Col span={12}>
            <Input
              placeholder="Search Top NFT"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col span={12} className="nft-timePeriod">
            <Select
              className="select-news"
              placeholder="Select TimePeriod"
              onChange={(value) => setTimePeriod(value)}
              defaultValue="1d"
            >
              <Option value="1d">Top NFTs today</Option>
              <Option value="7d">Top NFTs this Week</Option>
              <Option value="30d">Top NFTs of the Month</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <Row className="nft-header">
        <Col span={6}>
          <Typography.Title level={5}>Name</Typography.Title>
        </Col>
        <Col span={6}>
          <Typography.Title level={5}>Collection</Typography.Title>
        </Col>
        <Col span={6}>
          <Typography.Title level={5}>Date</Typography.Title>
        </Col>
        <Col span={6}>
          <Typography.Title level={5}>Price</Typography.Title>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        {nfts?.map((value, id) => (
          <Col span={24} key={id}>
            <Collapse>
              <Collapse.Panel
                showArrow={false}
                header={
                  <Row>
                    <Col span={6}>{value?.nft_name}</Col>
                    <Col span={6}>{value?.collection}</Col>
                    <Col span={6}>{value?.date}</Col>
                    <Col span={6}>{value?.price}</Col>
                  </Row>
                }
              >
                <Card>
                  <p style={{ textAlign: "center" }}>
                    <a href={value?.nft_url} target="_blank" rel="noreferrer">
                      Link to {value?.nft_name} NFT
                    </a>
                    <br />
                    <a
                      href={value?.collection_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Link to {value?.collection} Collection
                    </a>
                  </p>
                </Card>
              </Collapse.Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Nft;
