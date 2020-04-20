import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useStore } from '../../stores/storeConfig';


interface Props {
}

const ImageGallery: React.FC<Props> = observer(() => {
  const { t } = useTranslation();
  const { imageStore } = useStore();
  const { submintGetImages } = imageStore;
  useEffect(() => {
    submintGetImages('הולכי רגל');
  }, [submintGetImages]);
  const arrayImagesProps = toJS(imageStore.imagesData);
  const reactGallery = arrayImagesProps.map((x: any) => (
    <Col xs={6} md={4} key={x._id}>
      <Image src={x.filename} thumbnail />
      <div>{x.title}</div>
    </Col>
  ));
  return (
    <div>
      <h2>{t('Images')}</h2>
      <Container>
        <Row>
          {reactGallery}
        </Row>
      </Container>
    </div>
  );
});
export default ImageGallery;
