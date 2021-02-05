import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Loading from '../../components/Loading';
import FourOhFour from '../../components/404';
import { priceToString, calcCartTax } from '../../lib/utility';

const StyledOrderPage = styled.div`
  max-width: 500px;
  margin: 0 auto;

  .row {
    display: flex;
    justify-content: space-between;
    margin: 1rem;
  }

  .tax {
    margin-top: 3rem;
  }

  .total {
    font-weight: 700;
  }

  .fine_print {
    color: rgb(160, 160, 160);
    font-size: 0.9rem;
  }
`;

const GET_ORDER = gql`
  query orderById($id: ID!) {
    orderById(id: $id) {
      _id
      items {
        name
        description
        price
        quantity
      }
      total
      charge
    }
  }
`;

const OrderPage = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_ORDER, {
    variables: {
      id: router.query.id,
    },
  });

  const order = data?.orderById;
  console.log(order);

  function calcPreTaxTotal() {
    return Math.floor(
      order.items.reduce((prev, item) => {
        return prev + item.price;
      }, 0)
    );
  }

  const renderOrderItems = () => {
    return order.items.map((item) => {
      return (
        <div className="row">
          <span>
            {item.quantity} {item.name}
          </span>
          <span>{priceToString(item.price)}</span>
        </div>
      );
    });
  };

  if (loading) return <Loading />;
  if (error) return <FourOhFour />;

  return (
    <StyledOrderPage>
      <h3>
        Thank you for your order! <i>🌮</i>
      </h3>
      {renderOrderItems()}
      <div className="row tax">
        <span>Tax:</span>
        <span>{priceToString(calcCartTax(calcPreTaxTotal()))}</span>
      </div>
      <div className="row total">
        <span>Total:</span>
        <span> {priceToString(order.total)}</span>
      </div>
      <div className="row fine_print">
        <span>Order ID: {order._id}</span>
      </div>
      <div className="row fine_print">
        <span>Charge ID: {order.charge}</span>
      </div>
    </StyledOrderPage>
  );
};

export default OrderPage;
